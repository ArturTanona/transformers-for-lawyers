import subprocess
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from jina.clients import py_client
from Observable import Observable
from settings import client_port
server_port = int(os.environ["JINA_PORT"])
try:
    subprocess.Popen(["python3.7", "app.py", "-t", "query_restful"])
except FileNotFoundError:
    subprocess.Popen(["python3", "app.py", "-t", "query_restful"])

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
    py_client(host="localhost", port_expose=server_port, top_k=100).search(
        input_fn=read_query_data(query["searchQuery"]), output_fn=lambda x: observable.callback(x)
    )
    results = observable.format_response()
    return jsonify(results)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=client_port)
