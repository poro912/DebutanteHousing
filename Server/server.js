const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const body_parser = require('body-parser');

const cors = require('cors');
app.use(cors());

/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 모든 Origin에 대해 허용 (* 대신 원하는 Origin을 지정할 수 있습니다)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
*/

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
