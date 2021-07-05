# nodejs wake on lan server
A simple nodejs WOL Server, reading MAC Addresses, WOL Port, IP Address and broadcast Address of the clients under management from the ``servers.csv``.
Thereafter enabling the user to send WOL Packages to the specified clients and monitor their status using the webui on Port 7500.

### setup

1. Fill out the ``servers.csv`` with the servers you want to montor and wake
2. Install nodejs, python3 and pip
3. Install the required python packages using ``pip3 install -r requirements.txt``
4. Install the required nodejs packages using ``npm install; npm install -g pm2``
5. Render the Jinja2 templates using ``python3 renderJ2.py``
6. Start the server using ``pm2 start index.js``

### contributors

nodejs wake on lan server is created by the following people (in reverse alphabetical order):

| Name              | Realname              |
| ----------------- | --------------------- |
| x4                | Ferhat Dogru          |
| joengelh          | Jonas Engelahrdt      |
