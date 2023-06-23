/**
* @file     DB_System.js
* @brief    DB 관련 모듈 파일
* @details  DB에서 시스템적으로 필요한 상수와 모듈을 정의
* @details	모든 모듈은 await 상태로 진행되며 결과값을 얻기위해 async를 사용해야 함
* @author   PORO
* @date     2023/06/22
* @version  0.2
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
		return false;
	}
	console.log(row);
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


export default DB_system;