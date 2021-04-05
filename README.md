# transformers-for-lawyers
AI apps/benchmark for legaltech


<h2> Searching better search options for lawyers </h2>
<i>DEMO with huggingface, Jina and European Court of Justice judgments</i>
<br><br><br>

This site contains 113 judgments of the European Court of Justice
from 2019 and 2020 concerning tax issues.
<br><br>
All sentences from judgments have been encoded via BERT model
 (<code>bert-base-uncased</code>  provided by
 <a href="https://huggingface.co/">Huggingface's
 <code>transformers</code> library</a>), an example
 of a very powerful NLP model that has conquered AI applications.
<br><br>
The infrastructure of the search experience is based on
<a href="https://jina.ai/#/">Jina</a> - a wonderful scalable library to design neural search engines,
based on the <b>newest Deep Learning strategies</b>.
<br><br>
The entire concept - as well as Jina and Huggingface - has a great future in legal tech, because lawyers
need to use a lot of documents, and searching among them is highly challenging...
<br><br><br>


<h2> ...That's why law is so compelling and hard</h2>
<br> <b> How does it work? </b>
<ol>
<li>Write a phrase / sentence</li>
<li>Click Enter</li>
<li>You get the most similar sentence (the lower the score, the better)</li>
</ol>

<br> <b> Enjoy!... </b><br>
<br>
... and be aware that this is a playground. Sometimes BERT doesn't give proper hits,
but sometimes analogies are pretty impressive, like:
<br>
<br>
<b>QUERY:</b><i> that complaint was rejected</i>
<br>
<b>RESULTS:</b>
<ol>
<li><i>That request was rejected.</i></li>
<li><i>Its application was rejected,
as was the objection that it subsequently lodged.</i></li>
<li><i>That request was rejected.</i></li>
<li><i>That is unfair and unlawful.</i></li>
<li><i>That argument cannot be accepted.</i></li>

</ol>
<br>
<h1>Remarks</h1>
I am aiming to test other approaches (like other transformer architectures),
and fine-tune it, in order to prepare an ultimate benchmark of AI solutions
for legaltech, so stay tuned and follow me at
<a href="https://www.linkedin.com/in/artur-tanona/">LinkedIn</a>,
<a href="https://twitter.com/ArturTanona/">Twitter</a>
and on my blog at <a href="https://www.intelilex.net">inteliLex</a>.


<br><br>
If you would like to test it on more documents and play with the code,
please clone <a href="https://github.com/ArturTan/transformers-for-lawyers">this
git repository</a> and contribute to it.

<br>
<br>
Feel free to contact me: <a href="artur.tanona@gmail.com">artur.tanona@gmail.com</a>.


## Works on Ubuntu 18.04 and Docker

Below please find how to launch it on Ubuntu. If you are working on (for example) Windows 10 you need to have a Docker engine running and you can skip to the last part "[Run on Docker"](#run-on-docker)

## 1. Upload

Upload documents in `*.txt` format to `search_engine/data` and `frontendApp/src/assets`.

## 2. Set global environment variables

And put them in the `.public_env` file:
```
export JINA_PORT=56798
export JINA_PARALLEL=1
export JINA_SHARDS=1
export CLIENT_PORT=80
export JINA_WORKSPACE=test_index
export JINA_MAX_DOCS=100
export JINA_PORT=65481
```
## 3. Run locally
Create virtual environment and source it.

```
mkdir search_engine/pip_cache
sudo docker-compose build
sudo mkdir search_engine/test_index
sudo chmod 777 -R search_engine/test_index
sudo docker-compose up
```

And you can open the website on `http://localhost:4200`.

Please wait for a while in order to build index. 

## 4. Caveat

Demo does not include PolTaxBERT and StateAid Bert - they will be included soon. 