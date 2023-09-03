const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const body_parser = require('body-parser');

const router = require('./routes/route');
app.use(body_parser.json());

//const Controller = require('./controllers/controller');
//const DHM = require('./module_dvelop/DHM').module;
//const system = require('./utils/DHM_system').module;

const PORT = 3310;

router.route(app);

io.on('connection', (socket)=>Controller.socket(io, socket));

server.listen(PORT, (err)=>{
    if(err) throw '에러';
    console.log('연결 성공');
})
