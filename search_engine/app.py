__copyright__ = "Copyright (c) 2020 Jina AI Limited. All rights reserved."
__license__ = "Apache-2.0"

import click
import os
from glob import glob
from jina.flow import Flow
from jina.proto import jina_pb2
from jina import Document


def data_fn():
    print('test', os.getcwd(), os.listdir("data"))
    documents = glob("./data/*")
    print(documents)
    for i in documents:
        print(i)
        with open(i, 'r', encoding='utf-8') as f:
            content = f.read()
        with Document() as d:
            d.text = content
            d.tags['id_document'] = i
        yield d


@click.command()
@click.option('--task', '-t')
def main(task):
    if task == 'index':
        os.makedirs("data", exist_ok=True)
        f = Flow().load_config('flows/index.yml')
        with f:
            f.index(input_fn=data_fn)
    elif task == 'query_restful':
        f = Flow(rest_api=True).load_config('flows/query.yml')
        with f:
            f.block()
    else:
        raise NotImplementedError(
            f'unknown task: {task}. A valid task is `index` or `query` or `query_restful`.')


if __name__ == '__main__':
    main()
