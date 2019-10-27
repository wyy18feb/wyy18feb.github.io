---
layout: post
title: "Run A BERT Model On Pytorch"
---

# Background

I'm now starting to learn NLP with Pytorch. To install Pytorch, follow the guide on [pytorch.org](https://pytorch.org/get-started/locally/).

This is a quickstart of an advanced NLP model called "**BERT**" which stands for "**Bidirectional Encoder Representations from Transformers**". Here is the official repo for [bert](https://github.com/google-research/bert).

Here I found another useful repo [transformers](https://github.com/huggingface/transformers) contributed by Huggingface Institution. It has realized 10 NLU/NLG models so far.

# What to make?

I'm using BertForQuestionAnswering model with the pretrained config "bert-large-uncased-whole-word-masking-finetuned-squad" to run a simple QuestionAnswering Server.

## Model & Tokenizer

Install transformers by:

```bash
pip install transformers
```

Use **BertForQuestionAnswering** and **BertTokenizer** from transformers.

```python
from transformers import BertForQuestionAnswering, BertTokenizer

pretrained = 'bert-large-uncased-whole-word-masking-finetuned-squad'
cache_dir = '.cache/'
model = BertForQuestionAnswering.from_pretrained(pretrained, cache_dir=cache_dir)
tokenizer = BertTokenizer.from_pretrained(pretrained, cache_dir=cache_dir)
```

## QA

QuestionAnswering is about giving a paragraph and answering a question. So it needs a pair of tokens (paragraph tokens & question tokens). Since there are two kind of tokens, it is necessary to separate them with **segments ids**. After transforming the tokens into tensors, within one forward, it got start logits and end logits which together point to the position of the predicted answer.

```python
import torch

class QA(object):
    def __init__(self, paragraph):
        self.paragraph = paragraph
        self.paragraph_tokens = tokenizer.encode(paragraph, add_special_tokens=True)
        self.paragraph_tokens_length = len(self.paragraph_tokens)

    def answer(self, question):
        question_tokens = tokenizer.encode(question, add_special_tokens=True)[1:]
        indexed_tokens = self.paragraph_tokens + question_tokens
        segments_ids = [0] * self.paragraph_tokens_length + [1] * len(question_tokens)
        segments_tensors = torch.tensor([segments_ids])
        tokens_tensor = torch.tensor([indexed_tokens])
        with torch.no_grad():
            start_logits, end_logits = model(tokens_tensor, token_type_ids=segments_tensors)
        answer = tokenizer.decode(indexed_tokens[torch.argmax(start_logits):torch.argmax(end_logits) + 1])
        return answer
```

![indexed tokens](https://miro.medium.com/max/774/1*iJqlhZz-g6ZQJ53-rE9VvA.png)

## Run as a server

Install flask by:

```bash
pip install flask
```

I prefer to run this on flask server for its flexibility.

```python
from flask import Flask, jsonify, request
app = Flask(__name__)
```

Add routes to the flask app:

```python
qa = None

@app.route('/load', methods=['POST'])
def load_paragraph():
    if request.method == 'POST':
        paragraph = request.form.get('paragraph', None)
        if paragraph:
            global qa
            qa = QA(paragraph)
            return jsonify({'qa': qa.__dict__})
        else:
            return jsonify({'error': 'paragraph not uploaded'})


@app.route('/answer', methods=['POST'])
def answer():
    if request.method == 'POST':
        if qa is None:
            return jsonify({'error': 'paragraph not uploaded'})
        question = request.form.get('question', '')
        if question:
            answer = qa.answer(question)
            return jsonify({'answer': answer, 'question': question})
        else:
            return jsonify({'error': 'question not uploaded'})

```

Now, it can run by:

```python
if __name__ == '__main__':
    app.run()
```

# Effects

Here I use **SQuAD** to test it.

1. upload a paragraph  
```bash
curl -X POST http://127.0.0.1:5000/load -d paragraph="Formed in November 1990 by the equal merger of Sky Television and British Satellite Broadcasting, BSkyB became the UK's largest digital subscription television company. Following BSkyB's 2014 acquisition of Sky Italia and a majority 90.04% interest in Sky Deutschland in November 2014, its holding company British Sky Broadcasting Group plc changed its name to Sky plc. The United Kingdom operations also changed the company name from British Sky Broadcasting Limited to Sky UK Limited, still trading as Sky."                                                                 
```
It responses as followed:  
```json
{"qa":{"paragraph":"Formed in November 1990 by the equal merger of Sky Television and British Satellite Broadcasting, BSkyB became the UK's largest digital subscription television company. Following BSkyB's 2014 acquisition of Sky Italia and a majority 90.04% interest in Sky Deutschland in November 2014, its holding company British Sky Broadcasting Group plc changed its name to Sky plc. The United Kingdom operations also changed the company name from British Sky Broadcasting Limited to Sky UK Limited, still trading as Sky.","paragraph_tokens":[101,2719,1999,2281,2901,2011,1996,5020,7660,1997,3712,2547,1998,2329,5871,5062,1010,18667,4801,2497,2150,1996,2866,1005,1055,2922,3617,15002,2547,2194,1012,2206,18667,4801,2497,1005,1055,2297,7654,1997,3712,13052,1998,1037,3484,3938,1012,5840,1003,3037,1999,3712,28668,1999,2281,2297,1010,2049,3173,2194,2329,3712,5062,2177,15492,2904,2049,2171,2000,3712,15492,1012,1996,2142,2983,3136,2036,2904,1996,2194,2171,2013,2329,3712,5062,3132,2000,3712,2866,3132,1010,2145,6202,2004,3712,1012,102],"paragraph_tokens_length":97}}
```

2. commit a question
```bash
curl -X POST http://127.0.0.1:5000/answer -d question="Who is the UK's largest digital subscription television company?"
```
It responses as followed:  
```json
{"answer":"bskyb","question":"Who is the UK's largest digital subscription television company?"}
```

# References

- [Start Locally | Pytorch](https://pytorch.org/get-started/locally/)
- [huggingface/transformers Transformers:State-of-the-art Natural Language Processing for TensorFlow 2.0 and PyTorch](https://github.com/huggingface/transformers)
- [The Stanford Question Answering Dataset](https://rajpurkar.github.io/SQuAD-explorer/)
- [DEPLOYING PYTORCH IN PYTHON VIA A REST API WITH FLASK](https://pytorch.org/tutorials/intermediate/flask_rest_api_tutorial.html)