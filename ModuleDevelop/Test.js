const http = require('http');

const db = require('./DB/DB_Module');

const dhm = require('./DHModule');

const hostname = '127.0.0.1';
const port = 3000;

// 서버 생성 시 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
  db.status();

  dhm.init();
  
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  
  //db.setLoginInfo(, );
  
  var db_data = db.connect();

  
  db.selectAllUserTable(db_data);

  db.disconnect(db_data);

  db.room.room();
});


