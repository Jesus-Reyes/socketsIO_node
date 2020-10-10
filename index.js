const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js')



app.set('port', process.env.PORT  || 5000);

// Path Publico

const publicPath = path.resolve(__dirname, 'public');

app.use( express.static(publicPath))

server.listen(app.get('port'), (err)=> {
    if(err) throw new Error(err);
    console.log(`Servidor en PORT: ${app.get('port')}`);
});

