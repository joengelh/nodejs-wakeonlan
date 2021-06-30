# nodejs wake on lan server
simple docker WOL Server, reading CSV with Servers MAC Addresses, WOL Port, IP Address and broadcast Address

### setup

Fill out the ``servers.csv`` with the servers you want to montor and wake.

1. Make shure nodejs, python3 and pip are installed on your system.
2. Install the required python packages using ``pip3 install -r requirements.txt``
3. Install the required nodejs packages using ``npm install; npm install -g pm2``
4. Render the Jinja2 templates using ``python3 renderJ2.py``
i. Start the server using ``pm2 start index.js``

### contributors

nodejs wake on lan server is created by the following people (in reverse alphabetical order):

| Name              | Realname              |
| ----------------- | --------------------- |
| x4                | Ferhat Dogru          |
| joengelh          | Jonas Engelahrdt      |
