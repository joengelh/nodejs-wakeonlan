#use latest Ubuntu Container
FROM ubuntu:latest

#include known_hosts
RUN mkdir -p /app
ADD app /app
ADD renderJ2.py /
ADD servers.csv /

#stop ubuntu from annoying the fuck out me
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    dbus systemd systemd-cron rsyslog iproute2 python python-apt sudo bash ca-certificates && \
    apt-get clean && \
    rm -rf /usr/share/doc/* /usr/share/man/* /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN sed -i 's/^\(module(load="imklog")\)/#\1/' /etc/rsyslog.conf

# Don't start any optional services except for the few we need.
RUN find /etc/systemd/system \
    /lib/systemd/system \
    -path '*.wants/*' \
    -not -name '*dbus*' \
    -not -name '*journald*' \
    -not -name '*systemd-tmpfiles*' \
    -not -name '*systemd-user-sessions*' \
    -exec rm \{} \;

RUN systemctl set-default multi-user.target
RUN systemctl mask dev-hugepages.mount sys-fs-fuse-connections.mount

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       iputils-ping \
       net-tools \
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

# Set Node env to production
ENV NODE_ENV=production

#run ssh service  forever
CMD ["node", "index.js"] 
