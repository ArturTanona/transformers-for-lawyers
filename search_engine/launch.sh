#!/bin/bash
cp -R /pip_cache/* /pip_host_cache/
gunicorn -w 1 --bind 0.0.0.0:80 main:app