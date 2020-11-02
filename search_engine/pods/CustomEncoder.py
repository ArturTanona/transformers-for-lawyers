from typing import Any
from jina.hub.encoders.nlp.TransformerTorchEncoder import TransformerTorchEncoder


class CustomEncoder(TransformerTorchEncoder):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def encode(self, data: Any, *args, **kwargs):
        if len(data) == 1 and isinstance(data[0], bytes):
            new_data = []
            new_data.append(data[0].decode('UTF-8'))
            data = new_data
        x = super().encode(data, *args, **kwargs)
        return x
