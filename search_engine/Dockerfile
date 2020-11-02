FROM ubuntu:18.04
ENV TZ=Europe/Kiev
WORKDIR /
RUN apt-get update
RUN apt-get install -y curl python3.7 python3.7-dev python3.7-distutils python3-dev python3-pip
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.7 1
RUN update-alternatives --set python /usr/bin/python3.7
RUN apt install llvm-9-dev -y
RUN ln -s /usr/bin/llvm-config-9 /usr/bin/llvm-config
ADD ./requirements.txt /requirements.txt
ADD ./.pip_cache /pip_cache
RUN echo 'alias python3.7=/usr/bin/python3'
RUN python3.7 -m pip install -r requirements.txt --cache-dir /pip_cache
ADD . /
RUN apt install llvm-9-dev -y
RUN python3.7 -m pip install --pre torch -f https://download.pytorch.org/whl/nightly/cu110/torch_nightly.html --cache-dir /pip_cache


RUN chmod 777 launch.sh
ENTRYPOINT ["./launch.sh"]
