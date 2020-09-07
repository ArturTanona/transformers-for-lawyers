# transformers-for-lawyers
AI apps/benchmark for legaltech


<h2> Searching better search options for lawyers </h2>
<i>DEMO with huggingface, jina and European Court of Justice judgments</i>
<br><br><br>

This site contains 113 judgments of European Court of Justice
from 2019 and 2020 concerning the tax issues.
<br><br>
All sentences from judgments have been encoded via BERT model
 (<code>bert-base-uncased</code>  provided by
 <a href="https://huggingface.co/">Huggingface's
 <code>transformers</code> library</a>), i.e. example
 of very powerful NLP model that conquered the AI applications.
<br><br>
The infrastructure of the search experience is base on
<a href="https://jina.ai/#/">JINA AI</a>
- a wonderful scalable library to design neural search engines,
basing on the <b>newest Deep Learning strategies</b>.
<br><br>
The entire concept - as well as the Jina and Huggingface
- has a great future in legal tech, because lawyers
needs to use a lots of documents, and searching among them is highly challenging...
<br><br><br>


<h2> ...That's why law is so compelling and hard</h2>
<br> <b> How it works? </b>
<ol>
<li>You need to write a phrase / sentence</li>
<li>Click Enter</li>
<li>You get the most similar sentence (the lower score, the better)</li>
</ol>

<br> <b> Enjoy!... </b><br>
<br>
... and be aware that this is a playground. Sometimes BERT gives not proper hits,
but sometimes analogies are pretty impressive, like
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
and on blog at <a href="https://www.intelilex.net">inteliLex</a>.


<br><br>
If you would like to test it on more documents and play with the code,
please clone <a href="https://github.com/ArturTan/transformers-for-lawyers">this
git repository</a> and contribute to it.

<br>
<br>
Feel free to contact me: <a href="artur.tanona@gmail.com">artur.tanona@gmail.com</a>.


## Works on Ubuntu 18.04 and Docker

Below please find to launch it on Ubuntu. If you are working on e.g. Windows 10 you need to have a docer engine running and you can skip to the last part "Run on docker"

## 1. Upload

Upload documents in "*.txt" format to `search_engine/data` and `frontenApp/src/assets`.

## 2. Set up global environment variables
<code>export JINA_PORT=56798<br>
export PARALLEL=1<br>
export SHARDS=6<br>
export CLIENT_PORT=80<br>
export TMP_WORKSPACE=test_index
</code>

## 3. Run locally
In `search_engine` directory:<br>
`python3.7 app.py -t index`<br>
`gunicorn -w  1  --bind 0.0.0.0:6500 main:app`

In `frontendApp` directory:<br>
`npm install`<br>
`ng serve`<br>

And you can open the website on `http://localhost:4200`
## Run on docker

You can easily create docker apps, but you need to set up proper variables into DockerFiles in each app.

