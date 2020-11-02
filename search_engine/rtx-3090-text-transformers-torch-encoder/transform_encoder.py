__copyright__ = "Copyright (c) 2021 Jina AI Limited. All rights reserved."
__license__ = "Apache-2.0"

from typing import Dict, Iterable, Optional, Tuple

import numpy as np
import torch
from jina import DocumentArray, Executor, requests
from jina_commons.batching import get_docs_batch_generator
from transformers import AutoModel, AutoTokenizer

_DEFAULT_MODEL = "sentence-transformers/distilbert-base-nli-stsb-mean-tokens"


class TransformerTorchEncoder(Executor):
    """The TransformerTorchEncoder encodes sentences into embeddings using transformers models."""

    def __init__(
        self,
        pretrained_model_name_or_path: str = _DEFAULT_MODEL,
        base_tokenizer_model: Optional[str] = None,
        pooling_strategy: str = "mean",
        layer_index: int = -1,
        max_length: Optional[int] = None,
        embedding_fn_name: str = "__call__",
        device: str = "cpu",
        default_traversal_paths: Iterable[str] = ("r",),
        default_batch_size: int = 32,
        *args,
        **kwargs,
    ):
        """
        The transformer torch encoder encodes sentences into embeddings.

        :param pretrained_model_name_or_path: Name of the pretrained model or path to the
            model
        :param base_tokenizer_model: Base tokenizer model
        :param pooling_strategy: The pooling strategy to be used. The allowed values are
            ``'mean'``, ``'min'``, ``'max'`` and ``'cls'``.
        :param layer_index: Index of the layer which contains the embeddings
        :param max_length: Max length argument for the tokenizer, used for truncation. By
            default the max length supported by the model will be used.
        :param embedding_fn_name: Function to call on the model in order to get output
        :param device: Torch device to put the model on (e.g. 'cpu', 'cuda', 'cuda:1')
        :param default_traversal_paths: Used in the encode method an define traversal on the
             received `DocumentArray`
        :param default_batch_size: Defines the batch size for inference on the loaded
            PyTorch model.
        """
        super().__init__(*args, **kwargs)

        self.default_traversal_paths = default_traversal_paths
        self.default_batch_size = default_batch_size

        base_tokenizer_model = base_tokenizer_model or pretrained_model_name_or_path

        self.pooling_strategy = pooling_strategy
        self.layer_index = layer_index
        self.max_length = max_length

        self.device = device
        self.embedding_fn_name = embedding_fn_name

        self.tokenizer = AutoTokenizer.from_pretrained(base_tokenizer_model)
        self.model = AutoModel.from_pretrained(
            pretrained_model_name_or_path, output_hidden_states=True
        )
        self.model.to(device).eval()

    @requests
    def encode(self, docs: Optional[DocumentArray], parameters: Dict, **kwargs):
        """
        Encode text data into a ndarray of `D` as dimension, and fill the embedding of
        each Document.

        :param docs: DocumentArray containing text
        :param parameters: dictionary to define the `traversal_paths` and the
            `batch_size`. For example,
            `parameters={'traversal_paths': ['r'], 'batch_size': 10}`.
        :param kwargs: Additional key value arguments.
        """
        for batch in get_docs_batch_generator(
            docs,
            traversal_path=parameters.get(
                "traversal_paths", self.default_traversal_paths
            ),
            batch_size=parameters.get("batch_size", self.default_batch_size),
            needs_attr="text",
        ):
            texts = batch.get_attributes("text")

            with torch.no_grad():
                input_tokens = self._generate_input_tokens(texts)
                outputs = getattr(self.model, self.embedding_fn_name)(**input_tokens)
                if isinstance(outputs, torch.Tensor):
                    outputs = outputs.cpu().numpy()
                hidden_states = outputs.hidden_states
                embeds = self._compute_embedding(hidden_states, input_tokens)
                for doc, embed in zip(batch, embeds):
                    doc.embedding = embed

    def _compute_embedding(
        self, hidden_states: Tuple["torch.Tensor"], input_tokens: Dict
    ):
        fill_vals = {"cls": 0.0, "mean": 0.0, "max": -np.inf, "min": np.inf}
        fill_val = torch.tensor(fill_vals[self.pooling_strategy], device=self.device)
        layer = hidden_states[self.layer_index]

        attn_mask = input_tokens["attention_mask"]

        # Fix LongFormerModel like model which has mismatch seq_len between
        # attention_mask and hidden_states
        padding_len = layer.size(1) - attn_mask.size(1)
        if padding_len > 0:
            attn_mask = torch.nn.functional.pad(attn_mask, (0, padding_len), value=0)

        expand_attn_mask = attn_mask.unsqueeze(-1).expand_as(layer)

        layer = torch.where(expand_attn_mask.bool(), layer, fill_val)
        embeddings = layer.sum(dim=1) / expand_attn_mask.sum(dim=1)
        return embeddings.cpu().numpy()

    def _generate_input_tokens(self, texts):
        if not self.tokenizer.pad_token:
            self.tokenizer.add_special_tokens({"pad_token": "[PAD]"})
            self.model.resize_token_embeddings(len(self.tokenizer.vocab))

        input_tokens = self.tokenizer(
            texts,
            max_length=self.max_length,
            padding="longest",
            truncation=True,
            return_tensors="pt",
        )

        input_tokens = {k: v.to(self.device) for k, v in input_tokens.items()}
        return input_tokens
