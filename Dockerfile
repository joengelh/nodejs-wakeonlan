#use latest Ubuntu Container
FROM ubuntu:latest

#include known_hosts
RUN mkdir -p /app
ADD app /app
ADD renderJ2.py /
ADD servers.csv /

#stop ubuntu from annoying the fuck out me
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       nodejs \
       npm \
       apt-utils \
       build-essential \
       locales \
       wget \
       libffi-dev \
       libssl-dev \
       libyaml-dev \
       python3-dev \
       python3-setuptools \
       python3-pip \
       python3-apt \
       python3-yaml \
       software-properties-common \
       rsyslog systemd systemd-cron sudo iproute2 && \
       rm -Rf /usr/share/doc && \
       rm -Rf /usr/share/man && \
       apt-get clean && \
       rm -Rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN rm -f /lib/systemd/system/systemd*udev* && \
    rm -f /lib/systemd/system/getty.target

# Fix potential UTF-8 errors with ansible-test.
RUN locale-gen en_US.UTF-8

# Upgrade Pip to latest version working properly with Python2
RUN python3 -m pip install --no-cache-dir --upgrade "pip"

# Change working directory to app
WORKDIR "/app"

# Install Ansible via Pip.
RUN pip3 install -r /app/requirements.txt
RUN npm install

# Render jinja2 tenplates and change work dir beforehand
WORKDIR /
RUN python3 /renderJ2.py

# Change working directory back to app
WORKDIR "app/"

#run ssh service  forever
CMD ["node", "index.js"] 
