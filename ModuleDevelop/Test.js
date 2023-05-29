const http = require('http');

const db = require('./DB/DB_Module');

//const db = import('./DB/DB');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
  db.status();
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  
  var db_data = db.connect();

  db.selectAllUserTable(db_data);
  db.room.room();
});


