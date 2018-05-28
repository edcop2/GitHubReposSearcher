Web Based GitHub Repos Search App
=======================


## Requirements
**In order to run this app you will first have to install Node.js and the Node Package Manager (NPM) on your operating system.**
You can get Node.js [here](https://nodejs.org/en/download/).

## How to run

Clone Repo to your computer.

You can clone repo using command
```
npm install https://github.com/edcop2/GitHubRepoSearcher
```

If you just donload the Repo you need to install dependecies. To do it open the command line and navigate to folder with repo and install all dependecies using command
```
npm install .
```
You need to do it for server and for client.

Open command line and navigate to `/client` folder in repo.

To run the app use command.
```
npm start
```

You can also run the server separately. Just navigate to repo folder and use the same command.

## Change ports
App runs on `3000` and `3001` ports, so if you have them occupied, you may have to manually change ports.

To change port of the server navigate to `/bin/www` and select vacant port.
```var port = normalizePort('#your port#');
   app.set('port', port);
```

Client uses proxy to connect to server, so if you change default port of server, you'll also have to change proxy.
You can do it if you navigate to `/client/package.json` and change
```
"proxy": "http://localhost:#your port#"
```
To change port of a client on Linux change `start` script to
```
"scripts": {
  "start": "PORT=#your port# react-scripts start"
  }
```
and on Windows
```
"scripts": {
    "start": "SET PORT=#your port# && react-scripts start | node ./../bin/www"
    }
```
