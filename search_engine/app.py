__copyright__ = "Copyright (c) 2020 Jina AI Limited. All rights reserved."
__license__ = "Apache-2.0"

import click
import os
import pickle
from glob import glob
from jina.flow import Flow


def data_fn():
    documents = glob("data/*")
    for i in documents:
        with open(i, 'r', encoding='utf-8') as f:
            content = f.read()
        yield content


@click.command()
@click.option('--task', '-t')
def main(task):
    if task == 'index':
        f = Flow().load_config('flow-index.yml')
        with f:
            f.index(input_fn=data_fn)
    elif task == 'query_restful':
        f = Flow().load_config('flow-query.yml')
        with f:
            f.block()
    else:
        raise NotImplementedError(
            f'unknown task: {task}. A valid task is `index` or `query` or `query_restful`.')


if __name__ == '__main__':
    main()
