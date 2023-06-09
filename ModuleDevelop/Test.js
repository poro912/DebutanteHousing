
import http from 'http';
// import express from 'express';
import dhm from './DHModule.js';

import db from './DB/DB_Module.js';


const hostname = '127.0.0.1';
const port = 3000;



// 클라이언트 접근 시
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');

  //dhm.join("user","1234");
  var user = dhm.login("user","1234");
  console.log(user);
});

// 서버 생성 시
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  dhm.init ();
  dhm.join("user","1234");
  dhm.join("test","5678");
 
/*
  //db.room.room();
  //user = dhm.login('asd','123');
  console.log(user);
  console.log(user.code); 
  //room = dhm.loadRoom(user.code);
  console.log(room);
*/
});


