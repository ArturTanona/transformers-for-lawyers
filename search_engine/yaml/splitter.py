__copyright__ = "Copyright (c) 2020 Jina AI Limited. All rights reserved."
__license__ = "Apache-2.0"

from typing import Dict
import re
import string
from jina.hub.crafters.nlp.Sentencizer import Sentencizer
import pickle


class Splitter(Sentencizer):
    count = 0
    separator = "|"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def craft(self, text: str, *args, **kwargs) -> Dict:
        return dict(text=text, meta_info=text[:5].encode("utf-8"))


class SentenceSplitter(Sentencizer):
    count = 0
    separator = "|"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def craft(self, text: str, *args, **kwargs) -> Dict:
        results = []
        ret = text
        with open("tokenizer/eng_sentence_tokenizer.pkl", 'rb') as f:
            sent_tokenizer = pickle.load(f)
        for ci, (s, e) in enumerate(sent_tokenizer.span_tokenize(ret)):
            f = ret[s:e]
            f = f[:self.max_sent_len]
            if len(f) > self.min_sent_len:
                results.append(dict(
                    text=f,
                    offset=ci,
                    weight=1.0 if self.uniform_weight else len(f) / len(text),
                    location=[s, e]
                ))
        print(results)
        return results
