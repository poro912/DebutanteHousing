/**
* @file     DB_Moudle.js
* @brief    DB 관련 모듈 파일
* @details  DB와 관련된 모든 모듈을 모아놓은 파일
* @author   PORO
* @date     2023/05/30
* @version  0.1
* @exports	database
* @module	mysql2
*/

//const bcrypt = require('bcrypt');

// 모듈 정의
var database = {};

// require
const mysql = require('mysql2');
database.user = require('./user');
database.room = require('./room');
database.friend = require('./friend');
database.transcation = require('./transaction');
database.comment = require('./comment');

// 상수 정의
const DB_NAME = 'Debutante Housing';

const CURRENT = 'db_current';
const PERSONAL = "db_personal";
const TRANSCTION = "db_transaction";
const RECORD = "db_record";
const IDENTIFICATION = "db_identification";


// 변수 정의
// 데이터베이스 연결 정보
var connection = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '1234',
	database: CURRENT
};



// 로그인 정보 변경 (아이디 비밀번호)
/**
 * @param	{*} id 유저가 입력한 ID
 * @param	{*} pw 유저가 입력한 PW
 * @brief   로그인에 사용할 데이터를 변경함 
 * @details	로그인에 사용할 ID와 PW 값을 변경한다.
 * @details	public 변수에 저장되며 이후 connect를 바로 진행하면 된다.
 * @todo    작업 전
 */
database.setLoginInfo = (id, pw) => {
	connection.user = id;
	connection.password = pw;
}



// DB 연결 함수
// return db data
/**
 * @brief	DB 연결 함수
 * @details 저장된 ID PW를 바탕으로 DB에 접속을 시도함
 * @details 로그인에 성공하면 연결 정보가 담긴 객체를 반환한다.
 * @return	DB connection data
 * @todo    작업 전
 */
database.connect = () => {
	// 데이터베이스에 연결
	var db_data = mysql.createConnection(connection);

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



/**
 * @returns	T : 연결됨
 * @returns F : 연결안됨
 * @todo    작업 전
 */
database.status = () => {
	console.log(`return DB Connected status`);
	console.log(`database : ` + database.a);
	return false;
}


/**
 * @param	{*} id 유저가 입력한 ID
 * @param	{*} pw 유저가 입력한 PW
 * @return	bool 성공 여부 반환
 * @brief	로그인을 시도함
 * @details	
 * @todo	작업 전
*/
database.login = (id, pw) => {
	/*
	// 사용자 정보 조회
	const query = 'SELECT * FROM users WHERE username = ?';
	db_data.query(query, [username], (error, results) => {
		if (error) {
			console.error('Error querying the database:', error);
			res.status(500).send('Internal Server Error');
			return false;
		}

		if (results.length === 0) {
			// 사용자가 존재하지 않을 경우
			res.status(401).send('Invalid credentials');
			return false;
		} else {
			const user = results[0];

			// 비밀번호 비교
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) {
					console.error('Error comparing passwords:', err);
					res.status(500).send('Internal Server Error');
					return false;
				}

				if (isMatch) {
					// 로그인 성공
					res.status(200).send('Login successful');
					return true;
				} else {
					// 비밀번호 불일치
					res.status(401).send('Invalid credentials');
					return false;
				}
			});
		}
	});
	*/
}


/**
 * @param	{*} db_data db 연결정보 데이터
 * @return	bool 성공 여부 반환
 * @brief	DB와의 연결을 끊음
 * @details	db_data를 바탕으로 연결을 끊음
 * @todo	작업 전
*/
database.disconnect = (db_data) => {
	if (null == db_data) {
		printerror('already disconnected');
		return flase;
	}

	db_data.disconnect();
	console.log(`DB Disconnect`);
	return true;
}


// 테스트용 함수
database.selectAllUserTable = (db_data) => {
	if (db_data == null) {
		printerror(`DB connect data is null`)
		return;
	}

	db_data.query('USE ' + CURRENT);

	// `users` 테이블에서 모든 사용자를 가져옵니다.
	db_data.query('SELECT * FROM user', (err, results) => {

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


/**
* @brief    디버깅용 콘솔 출력함수
* @details  입력받은 메시지를 출력시킴
*/
printerror = (msg) => {
	console.log('error occured');
	console.log('DB_Moudle : ' + msg);
	console.log();
}


module.exports = database;
