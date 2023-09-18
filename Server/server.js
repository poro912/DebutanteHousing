const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const body_parser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(body_parser.json());

const router = require('./routes/route');
const config = require('../config.js');

const PORT = config.Server.port;

router.route(app);

io.on('connection', (socket)=>Controller.socket(io, socket));

server.listen(PORT, (err)=>{
    if(err) throw '에러';
    console.log('연결 성공');
})
