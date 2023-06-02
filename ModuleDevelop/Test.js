const http = require('http');

const dhm = require('./DHModule');

const hostname = '127.0.0.1';
const port = 3000;

// 클라이언트 접근 시
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
  db.status();

  
});

// 서버 생성 시
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  dhm.init();

  //db.room.room();
  user = dhm.login('asd','123');
  console.log(user);
  console.log(user.code);
  room = dhm.loadRoom(user.code);
  console.log(room);

});


