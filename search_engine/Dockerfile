FROM ubuntu:18.04
ENV TZ=Europe/Kiev
WORKDIR /
RUN apt-get update
RUN apt-get install -y curl python3.7 python3.7-dev python3.7-distutils
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.7 1
RUN update-alternatives --set python /usr/bin/python3.7
RUN curl -s https://bootstrap.pypa.io/get-pip.py -o get-pip.py && \
    python get-pip.py --force-reinstall && \
    rm get-pip.py

ENV JINA_PORT=X #You need to set your own port
ENV PARALLEL=1
ENV SHARDS=1
ENV CLIENT_PORT=80
ENV TMP_WORKSPACE=test_index


ADD ./requirements.txt /requirements.txt
RUN python -m pip install -r requirements.txt
ADD . /

RUN echo 'alias python3.7=/usr/bin/python3'
ENTRYPOINT ["gunicorn", "-w", "1", "--bind", "0.0.0.0:80", "main:app"]
