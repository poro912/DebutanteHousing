const express = require('express');
const session = require('express-session');

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

io.on('connection', (socket) => Controller.socket(io, socket));

app.use(
	session({
		secret: 'your-secret-key', // 세션 데이터 암호화에 사용되는 비밀 키
		resave: false,
		saveUninitialized: true,
	})
);

server.listen(PORT, (err) => {
	if (err) throw '에러';
	console.log(`연결 성공 port : ${PORT}`);
})


/*
// 로그인 코드
app.get('/login', (req, res) => {
  // 사용자가 로그인하면 세션에 사용자 정보 저장
  req.session.user = { id: 123, username: 'exampleUser' };
  res.send('Logged in successfully.');
});

// 세션 정보 반환 코드
app.get('/profile', (req, res) => {
  // 세션에서 사용자 정보 읽기
  if (req.session.user) {
    const user = req.session.user;
    res.send(`Welcome, ${user.username}!`);
  } else {
    res.send('Please log in first.');
  }
});

// 로그아웃 코드
app.get('/logout', (req, res) => {
  // 로그아웃 시 세션에서 사용자 정보 삭제
  delete req.session.user;
  res.send('Logged out successfully.');
});

const crypto = require('crypto');

// 세션 생성 코드
// 안전한 세션 ID 생성 함수
function generateSessionID() {
  const buffer = crypto.randomBytes(16); // 16바이트의 난수 생성
  return buffer.toString('hex'); // 16진수 문자열로 변환
}

// 세션 ID 생성 및 출력
const sessionID = generateSessionID();
console.log(sessionID);

*/