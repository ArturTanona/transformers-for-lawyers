#!/usr/bin/python3.7
import json
import logging
import os
import platform
import subprocess

logger = logging.getLogger("TEST")
logger.setLevel(logging.INFO)

import time

import requests
from checksumdir import dirhash
from flask import Flask, jsonify, request
from flask_cors import CORS
from Observable import Observable

from settings import client_port

server_port = int(os.environ["JINA_PORT"])
logger.error("================== test")
if dirhash("/test_index") != os.environ["HASH_DIRECTORY"]:
    logger.error("================== OK")
    process = subprocess.Popen(["python", "app.py", "-t", "index"])
    process.wait()
    time.sleep(30)
else:
    logger.error("================== OK NOK")
logger.error(dirhash("/test_index"))
subprocess.Popen(["python", "app.py", "-t", "query_restful"])

app = Flask(__name__)
CORS(app)


def read_query_data(text):
    yield "{}".format(text).encode("utf8")


@app.route("/")
def response():
    return 200


@app.route("/api/search", methods=["POST"])
def search():
    observable = Observable()
    query = request.get_json()
    query = query["data"]

    answer = requests.post(
        f"http://localhost:{server_port}/api/search", json={"data": query, "top_k": 10}
    ).text

    answer = json.loads(answer)
    observable.result = answer
    results = observable.format_response()
    return jsonify(results)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6500)
