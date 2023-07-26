const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const router = require('./routes/route')
//const Controller = require('./controllers/controller');

router.route(app);

io.on('connection', (socket)=>Controller.socket(io, socket));

server.listen(5000, (err)=>{
    if(err) throw '에러';
    console.log('연결 성공')
})
