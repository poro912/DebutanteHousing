/**
* @file     DB_System.js
* @brief    DB 관련 모듈 파일
* @details  DB에서 시스템적으로 필요한 상수와 모듈을 정의
* @author   PORO
* @date     2023/06/11
* @version  0.1
* @exports	database
* @module	mysql2
*/

import mysql from 'mysql2/promise.js';

// 상수 정의
const DB_NAME = 'Debutante Housing';

const CURRENT = 'db_current';
const PERSONAL = "db_personal";
const TRANSCTION = "db_transaction";
const RECORD = "db_record";
const IDENTIFICATION = "db_identification";

const DEBUG = true;

let DB_system = {};

let connection = await mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "A12345678!",
	database: "db_personal",
});
DB_system.connection = connection;

let getConnection = async () => {
	var conn;
	conn = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "A12345678!",
		database: "db_personal",
	});
	return conn;
}
DB_system.getConnection = getConnection;

let execQuery = async (conn, query) => {
	var row, fields;
	try {
		[row, fields] = await conn.query(query);
	} catch (error) {
		console.log(error);
	}
	return row;
}
DB_system.execQuery = execQuery;

let checkNodate = (target) =>
{
	if(Object.keys(target).length === 0){
		return true;
	}
	return false;
}
DB_system.checkNodate = checkNodate;

let useCurrent = (conn) => {
	return execQuery(conn, `use ${CURRENT}`)
}
DB_system.useCurrent = useCurrent;

let usePersonal = (conn) => {
	return execQuery(conn, `use ${PERSONAL}`)
}
DB_system.usePersonal = usePersonal;

let useTranscation = (conn) => {
	return execQuery(conn, `use ${TRANSCTION}`)
}
DB_system.useTranscation = useTranscation;

let useRecord = (conn) => {
	return execQuery(conn, `use ${RECORD}`)
}
DB_system.useRecord = useRecord;

let useIdentification = (conn) => {
	return execQuery(conn, `use ${IDENTIFICATION}`)
}
DB_system.useIdentification = useIdentification;


/**
* @brief    디버깅용 콘솔 출력함수
* @details  입력받은 메시지를 출력시킴
*/
DB_system.debugPrintError = (error_spot , ...messages) => {
	console.log('error occured');
	process.stdout.write(error_spot + ' : ');
	for(const msg of messages){
		console.log(msg);
	}
	console.log();
}


DB_system.debugPrint = (...messages) => {
	if (!DEBUG) return;

	for(const msg of messages){
		console.log(msg);
	}
	console.log();
	return;
}

export default DB_system;