#!/usr/bin/env python3

#import modules
from jinja2 import Environment, FileSystemLoader
import csv

#read csv into dict
csvFile = csv.DictReader(open('servers.csv'))

#initialize empty dict
result = {}
for row in csvFile:
    key = row.pop('name')
    result[key] = row

#new enviroment to render templates in
env = Environment(loader=FileSystemLoader('app/templates'))

#render html template
htmlJ2 = env.get_template('index.html.j2')
htmlParsed = htmlJ2.render(servers=result.keys())
with open("./app/public/index.html", "w") as html:
    html.write(htmlParsed)

#render scripts from templates
serverCodeJ2 = env.get_template('serverCode.js.j2')
for server in result.keys():
    serverCodeParsed = serverCodeJ2.render(name=server,
            ip=result.get(server)["ip"],
            mac=result.get(server)["mac"])
    serverCodeName = "./app/public/" + str(server) + ".js"
    with open(serverCodeName, "w") as serverCode:
        serverCode.write(serverCodeParsed)
