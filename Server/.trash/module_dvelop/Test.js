
//import http from 'http';
//import dhm from './DHM.js';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const dhm = require('./DHM.js');

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
  //test_user();
  test_room();
});

function test_user()
{
  var result1 = dhm.login("id1","pw101", (result)=>{
    console.log("실패 결과 출력");
    
    console.log(result);
  });
  console.log("result1",result1);

  //get 
  var result2 = dhm.login("id1","pw1", (result)=>{
    console.log("성공 결과 출력");
    console.log(result);
  });

  var join = dhm.join("angus","1234","이무현","poro","angus99@naver.com","010-8355-3460",(result)=>{
    console.log("성공 결과 출력");
    console.log(result);
  });

  console.log("result2",result2);
}

function test_room()
{
  
}


