/**
* @file     DB_Moudle.js
* @brief    유저 관련 모듈
* @details  유저 관련된 모듈을 모아놓은 파일
* @details  로그인, 회원가입, 정보변경, 탈퇴, 타 유저 정보 조회
* @author   PORO
* @date     2023/06/22
* @version  0.2
	result = await DB_system.e
* @todo		유저 정보를 얻을 수 있는 모듈을 제작해야 함
* @todo		유저 정보를 변경하는 모듈을 제작해야 함
* @todo		반환 값 설계 진행 후 함께 변경해야 함
* @details	회원가입, 로그인 모듈의 개발이 완료됨
*/

const db = require('./DB_systeam').module;
const system = require('./DHM_system').module;
//const DHM_system = require('../System/DHM_system.js').module;

const user = {
	info : {
		FILE : "utils/user.js",
	},
	/**
 	 * @param	
 	 * @param	
 	 * @return	
	 * @brief	
	 * @details	
	 * @todo	검증전
	*/
	joinIn : async (id, pw, name, nick, email, phone) => {
		let result = {
			code: Number,
			id: String,
			nick: String
		};
		var conn = await db.getConnection();
		//var code = 901;
		var temp;
		
		//await db.use.personal(conn);
		await db.use.identification(conn);
		temp = await db.execQuery(conn,
			`call user_join("${id}","${pw}","${name}","${nick}");`
		);

		system.debug.print(temp);


		/*
		await db.use.personal(conn);
		temp = await db.execQuery(conn,
			`insert into user (code, id, pw, name, email, phone) 
			values("${code}","${id}","${pw}","${name}","${email}","${phone}");`
		);
		system.debug.print(temp);
		if(false === temp) return false;
	
		await db.use.current(conn);
		temp = await db.execQuery(conn,
			`insert into user (code, id, nick) 
			values("${code}","${id}","${nick}");`
		);
		*/

		if(false === temp) return false;
	
		system.Debug.print(temp);
		result.code = 901;
		result.id = id;
		result.nick = nick;
		return result;
	},
	
	/**
	 * @param	{*} id 유저가 입력한 ID
	 * @param	{*} pw 유저가 입력한 PW
	 * @return	초기화면을 구성하는데 필요한 데이터를 반환함
	 * @brief	로그인을 시도함
	 * @details	로그인에 성공하면 true 실패하면 false
	 * @todo	작업 전
	*/
		login : async (id, pw) => {
		var result = {
			code: Number,
			nick: String,
		};
		var temp;
		var row, fields;

		// user table 정보 가져오기
		var conn = await db.getConnection();
		await db.use.personal(conn);
		temp = await db.execQuery(conn, `SELECT * FROM user WHERE id = "${id}" and pw = "${pw}";`);


		// 조회 결과 값 없음
		if (db.checkNodate(temp)) {
			DHM_system.Debug.printError(user.info.FILE + " login()", "sql no data")
			result.code = -1;
			result.nick = "";
			return result;
		}
		// 단일 값 
		temp = temp[0];

		DHM_system.Debug.print(temp, temp["code"]);
		result.code = temp['code'];
		result.nick = await USER_MODULE.getNick(result.code);

		console.log("result : ", result);

		return result;
	},

	/**
	 * @param	
	 * @param	
	 * @return	
	 * @brief	
	 * @details	
	 * @todo	작업 전
	*/
	getNick : async (code = 0) => {
		//if(code == undefined) return "";
		var result;
		var temp;
		if (code <= 0) {
			return "";
		}
		console.log("get usercode : ", code);
		var conn = await db.getConnection();
		await db.use.current(conn);
		temp = await db.execQuery(conn, `SELECT nick FROM user WHERE code = "${code}";`);
		
		if(false === temp) return false;
		temp = temp[0];

		result = temp["nick"];

		return result;
	},
	/**
	 * @param	
	 * @param	
	 * @return	
	 * @brief	
	 * @details	
	 * @todo	작업 전
	*/
	getInfo : async (code = 0) => {
		var result = {
			code: Number,
			nick: String,
		};
		var temp;
		var row, fields;
		
		console.log('USER : getInfo');


		// SQL commands
		// user table 정보 가져오기
		var conn = await db.getConnection();
		await db.use.current(conn);
		temp = await db.execQuery(conn, ``);


		// 조회 결과 값 없음
		if (db.checkNodate(temp)) {
			DHM_system.Debug.printError(user.info.FILE + " login()", "sql no data")
			// set error data
			result.code = -1;
			result.nick = "";
			return result;
		}
		// 단일 값 
		temp = temp[0];

		DHM_system.Debug.print(temp, temp["code"]);
		result.code = temp['code'];

		console.log("result : ", result);

		return result;
	}
}
exports.module = user;