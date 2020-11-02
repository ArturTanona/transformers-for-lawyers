__copyright__ = "Copyright (c) 2021 Jina AI Limited. All rights reserved."
__license__ = "Apache-2.0"

__version__ = "0.0.1"

import os
import sys
from glob import glob

import click
from jina import Document, DocumentArray, Flow
from jina.logging.predefined import default_logger as logger


def input_generator():
    files = glob("data/*")
    for file in files:
        with open(file, "r") as f:
            text = f.read()
        doc = Document(text=text)
        doc.tags["SName"] = os.path.basename(file)

        yield doc


def config():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    os.environ.setdefault("JINA_WORKSPACE", os.path.join(cur_dir, "workspace"))
    os.environ.setdefault(
        "JINA_WORKSPACE_MOUNT",
        f'{os.environ.get("JINA_WORKSPACE")}:/workspace/workspace',
    )
    os.environ.setdefault("JINA_LOG_LEVEL", "INFO")
    os.environ.setdefault("JINA_PORT", str(45678))


# for index
def index(num_docs):
    flow = Flow.load_config("flows/index.yml")
    with flow:
        input_docs = input_generator()
        flow.post(on="/index", inputs=input_docs, request_size=10, show_progress=True)


# for search
def query():
    flow = Flow.load_config("flows/query.yml")
    flow.rest_api = True
    flow.protocol = "http"
    with flow:
        flow.block()


def query_text():
    def print_result(response):
        doc = response.docs[0]
        for index, parent in enumerate(doc.matches):
            print(f'Parent {index}: Song Name: {parent.tags["SName"]}\n{parent.text}')
        import pdb

        pdb.set_trace()
        for index, chunk in enumerate(doc.chunks):
            print(f"Chunk {index}: {chunk.text}")
            for match in chunk.matches:
                import pdb

                pdb.set_trace()
                print(f"\tMatch: {match.text}")

    f = Flow.load_config("flows/query.yml")
    with f:
        while True:
            search_text = input("Please type a sentence: ")
            doc = Document(content=search_text)

            response = f.post(
                "/search",
                inputs=doc,
                parameters={"lookup_type": "parent"},
                return_results=True,
            )
            print_result(response[0].data)


@click.command()
@click.option(
    "--task",
    "-t",
    type=click.Choice(["index", "query", "query_text"], case_sensitive=False),
)
@click.option("--num_docs", "-n", default=10000)
def main(task, num_docs):
    config()
    workspace = os.environ["JINA_WORKSPACE"]
    if task == "index":
        if os.path.exists(workspace):
            logger.error(
                f"\n +---------------------------------------------------------------------------------+ \
                    \n |                                   🤖🤖🤖                                        | \
                    \n | The directory {workspace} already exists. Please remove it before indexing again. | \
                    \n |                                   🤖🤖🤖                                        | \
                    \n +---------------------------------------------------------------------------------+"
            )
            sys.exit(1)
        index(num_docs)
    elif task == "query":
        query()
    elif task == "query_text":
        query_text()
    else:
        raise NotImplementedError(f"Unknown task: {task}.")


if __name__ == "__main__":
    main()
