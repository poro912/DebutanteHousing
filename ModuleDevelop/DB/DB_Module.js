const mysql = require('mysql2');

// 모듈 정의
var database = {};

// 상수 정의
const DB_NAME = 'Debutante Housing';

const CURRENT = 'db_current';
const PERSONAL = "db_personal";
const TRANSCTION = "db_transaction";
const RECORD = "db_record";
const IDENTIFICATION = "db_identification";


// public 변수 정의

// 데이터베이스 연결 정보
var connection = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '1234',
	database: CURRENT
};

// 

// 로그인 정보 변경 (아이디 비밀번호)
/**
 * @param {*} id 
 * @param {*} pw 
 * @returns 
 */
database.setLoginInfo = (id, pw) => {
	connection.user = id;
	connection.password = pw;
	return true;
}


// DB 연결 함수
// return db data
/**
 * @constant DB 연결 함수
 * @brief DB 연결 함수
 * @details 반환값을 바탕으로 DB 함수들을 동작시킴
 * @description 반환값을 바탕으로 DB 함수들을 동작시킴
 * @returns DB connection data
 */
database.connect = () => {
	// 데이터베이스에 연결
	const db_data = mysql.createConnection(connection);

	db_data.connect((err) => {
		if (err) {
			printerror('connect error');
			console.log(err);
			return null;
		}
	});
	console.log('return db_data');
	return db_data;
}

// DB 연결 정보 출력
// false : 연결 안됨
// true : 연결 됨
/**
 * @returns true : 연결됨
 * @returns false : 연결안됨
 */
database.status = () => {
	console.log(`return DB Connected status`);
	console.log(`database : ` + database.a);
	return false;
}

// DB연결을 해제한다.
database.disconnect = (db_data) => {
	if(null == db_data){
		printerror('already disconnected');
		return flase;
	}
	
	db_data.disconnect();
	console.log(`DB Disconnect`);
	return true;
}

database.selectAllUserTable = (db) => {
	if(db == null){
		printerror(`DB connect data is null`)
		return;
	}

	db.query('USE ' + CURRENT);
	
	// `users` 테이블에서 모든 사용자를 가져옵니다.
	db.query('SELECT * FROM user', (err, results) => {

		if (err) {
			printerror('select error');
			console.log(err);
			return;
		}

		// 결과를 출력합니다.
		results.forEach((row) => {
			console.log(row);
		});
	});
}


printerror = (msg)=> {
	console.log('error occured');
	console.log('DB_Moudle : ' + msg);
	console.log();
}


module.exports = database;
