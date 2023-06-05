// const http = require('http');
import http from 'http';

//const dhm = require('./DHModule');
import dhm from './DHModule.js';
//import dhm from './TestDHM.js';
const hostname = '127.0.0.1';
const port = 3000;



// 클라이언트 접근 시
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

// 서버 생성 시
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  dhm.init ();
  dhm.join("hello","hdslk")
/*
  //db.room.room();
  //user = dhm.login('asd','123');
  console.log(user);
  console.log(user.code); 
  //room = dhm.loadRoom(user.code);
  console.log(room);
*/
});


