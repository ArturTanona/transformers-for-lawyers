<h1>How to find a proper use case? - legal tech search experience. 
Grasp of ideas for Jina X Hackathon participants.</h1>


This short post is not for those who would like to create a sophisticated technical architecture, 
but for those who are wondering how to find a real use case when Jina can be useful. 
I am presenting to you some questions that should be asked when you are thinking about neural
search engines for real-life scenarios.

My specific environment is legal tech (legal technology) and I can point out four 
things that are valid also in other market areas.

**Only big companies could create optimized and scalable solutions.** And only big 
clients of those law firms can afford the large neural search engines. 
If anyone needs to obey the law, why only the chosen ones with enough privileges 
can get the advanced AI solutions? What about the access to justice: 

> One of the major obstacles in accessing justice is the cost of legal advice and
representation ([UN on rule of law](https://www.un.org/ruleoflaw/thematic-areas/access-to-justice-and-rule-of-law-institutions/access-to-justice/))

How you can fight for your rights against the AI-supported tycoons?

**There is a great bias against technology among some people.** For instance, in France, you
 cannot apply ML on the judgments if you can identify the judge (the author of the judgment). 
 It is banned by law, so researchers need to provide pseudonymization  before they can do really cool stuff.
 How to convince authorities that AI is the ally, not the threat?
 
**Some people do not believe in the safety of cloud infrastructure.** 
Maybe in the Common Law countries, like the USA and UK, it is odd to be against
 technological progress, however, still there are some jurisdictions that are very 
 afraid of technology. Some banks need to keep all documentation in their country 
 (resp. in EU) and they cannot use the cloud solution located in the foreign infrastructure.
  How to use scalable solutions without Microsoft Azure Cognitive Search or AWS?
  
**Everybody uses great NLP solutions but not in the law.** Everybody in Data Science is 
aiming at breaking another accuracy record and benchmark: Squad 2.0 or MNIST. 
But what about the real scenario? The big hypotheses aren’t falsified broadly in the case of 
judgments or resolutions. 

<h2>I think that’s why the open source is gonna save us.</h2>

Jina addresses some of the aforementioned needs:

**Solution in-premise.** You can build a neural search engine on the safe intranet 
server with few docker containers. 

**Portability and fact-checking**. You can utilize a different language model as the 
basis for indexing results. Is the transformer what you need in the specific domain 
task? Does ULMFiT perform better? Check the basic models, fine-tune them, create your
 own transformers, and load them with Jina. 
 
**Search by analogy**. There are some fields where searching with analogies can provide 
better results. The following is an example for the European Court of Justice judgments:


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

*** 
  
I am sure that some of those questions are related to other areas, like marketing or finance. 
There is a lot of work to do and I am looking forward to see your ideas. Do not hesitate to ask me any questions. 
I would be happy to answer them on <a href="https://www.linkedin.com/in/artur-tanona/">LinkedIn</a>. Cheers! 


----

PS. Regarding transformers-for-lawyers - I am aiming to test other approaches (like other transformer architectures),
and fine-tune it, in order to prepare an ultimate benchmark of AI solutions
for legaltech, so stay tuned and follow me at
<a href="https://www.linkedin.com/in/artur-tanona/">LinkedIn</a>,
<a href="https://twitter.com/ArturTanona/">Twitter</a>
and on my blog at <a href="https://www.intelilex.net">inteliLex</a>.

You can find the core of my project here: https://github.com/ArturTan/transformers-for-lawyers 

Test it, use it, and encourage your colleagues from the law world to check whether transformers 
(and other algorithms) can meet her/his needs. 
