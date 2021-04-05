#!/bin/bash
python app.py -t index
gunicorn -w 1 --bind 0.0.0.0:80 main:app