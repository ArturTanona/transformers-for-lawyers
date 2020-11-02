#!/bin/bash
gunicorn -w 1 --bind 0.0.0.0:80 main:app --timeout 3600