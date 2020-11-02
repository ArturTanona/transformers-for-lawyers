FROM ubuntu:18.04
ENV TZ=Europe/Kiev
WORKDIR /
RUN apt-get update
RUN apt-get install -y curl python3.8 python3.8-dev python3.8-distutils python3-dev python3-pip
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1
RUN update-alternatives --set python /usr/bin/python3.8
RUN apt install llvm-9-dev -y
RUN ln -s /usr/bin/llvm-config-9 /usr/bin/llvm-config
ADD ./requirements.txt /requirements.txt
RUN echo 'alias python3.8=/usr/bin/python3'
RUN python3.8 -m pip install -r requirements.txt
COPY / /app
WORKDIR /app
# RUN python3.8 -m pip install jina==1.1.9

RUN chmod 777 launch.sh
ENTRYPOINT ["./launch.sh"]
