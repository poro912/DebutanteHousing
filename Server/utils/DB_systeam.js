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
const mysql = require('mysql2/promise.js');

const db={
	info : {
		DB_NAME		: 'Debutante Housing',
		CURRENT		: 'db_current',
		PERSONAL	: "db_personal",
		TRANSCTION	: "db_transaction",
		RECORD		: "db_record",
		IDENTIFICATION	: "db_identification",
		FUNCTION	: "db_function",
		VIEW		: "db_views",
		DBHOST		: "localhost",
		//DBHOST		: "182.220.199.210",
		DBPORT		: 3306,
	},
	use : {
		current			: (conn) => {return db.execQuery(conn, `use ${db.info.CURRENT}`)},
		personal		: (conn) => {return db.execQuery(conn, `use ${db.info.PERSONAL}`)},
		transcation		: (conn) => {return db.execQuery(conn, `use ${db.info.TRANSCTION}`)},
		record			: (conn) => {return db.execQuery(conn, `use ${db.info.RECORD}`)},
		identification	: (conn) => {return db.execQuery(conn, `use ${db.info.IDENTIFICATION}`)},
		view	: (conn) => {return db.execQuery(conn, `use ${db.info.VIEW}`)},
		func	: (conn) => {return db.execQuery(conn, `use ${db.info.FUNCTION}`)},
	},

	getConnection : async () => {
		var conn;
		conn = await mysql.createConnection({
			host: db.info.DBHOST,
			user: "webuser",
			password: "A12345678!",
			database: "db_personal",
		});
		return conn;
	},
	execQuery : async (conn, query) => {
		var row, fields;
		try {
			[row, fields] = await conn.query(query);
		} catch (error) {
			console.log(error);
			return false;
		}
		//console.log(row);
		return row;
	},
	checkNodate : (target) =>{
		if(Object.keys(target).length === 0){
			return true;
		}
		return false;
	},
};

exports.module = db;
