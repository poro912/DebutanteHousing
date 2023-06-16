/**
* @file     DB_Moudle.js
* @brief    유저 관련 모듈
* @details  유저 관련된 모듈을 모아놓은 파일
* @details  로그인, 회원가입, 정보변경, 탈퇴, 타 유저 정보 조회
* @author   PORO
* @date     2023/05/30
* @version  0.1
*/

import DB_system from './DB_Systeam.js';

const FILE = "user.js";
let USER_MODULE = {};

/**
 * @param	
 * @param	
 * @return	
 * @brief	
 * @details	
 * @todo	작업 전
*/
USER_MODULE.joinIn = async (id, pw, name, nick, email, phone) => {
	
	var result;
	var conn = await DB_system.getConnection();
	await DB_system.usePersonal(conn);
	result = await DB_system.execQuery(conn, 
		`insert into user (code, id, pw, name, email, phone) 
		values("${code}","${id}","${pw}","${name}","${email}","${phone}");`);
	
	
	await DB_system.useCurrent(conn);
	result = await DB_system.execQuery(conn, 
		`insert into user (code, id, nick) 
		values("${code}","${id}","${nick}");`);
}


/**
 * @param	{*} id 유저가 입력한 ID
 * @param	{*} pw 유저가 입력한 PW
 * @return	초기화면을 구성하는데 필요한 데이터를 반환함
 * @brief	로그인을 시도함
 * @details	
 * @todo	작업 전
*/
USER_MODULE.login = async (id, pw) => {
	var result = {
		code: Number,
		nick: String,
	};
	var temp;
	var row, fields;

	// user table 정보 가져오기
	var conn = await DB_system.getConnection();
	await DB_system.usePersonal(conn);
	temp = await DB_system.execQuery(conn, `SELECT * FROM user WHERE id = "${id}" and pw = "${pw}";`);
	

	// 조회 결과 값 없음
	if(DB_system.checkNodate(temp)){
		DB_system.debugPrintError(FILE + " login()", "sql no data")
		result.code = -1;
		result.nick = "";
		return result;
	}
	// 단일 값 
	temp = temp[0];

	DB_system.debugPrint(temp, temp["code"]);
	result.code = temp['code'];
	result.nick = await USER_MODULE.getNick(result.code);

	console.log("result : ",result);

	return result;
}

USER_MODULE.getNick = async (code = 0) => {
	//if(code == undefined) return "";
	var result;
	var temp;
	if (code <= 0) {
		return "";
	}
	console.log("get usercode : ", code);
	var conn = await DB_system.getConnection();
	await DB_system.useCurrent(conn);
	temp = await DB_system.execQuery(conn, `SELECT nick FROM user WHERE code = "${code}";`);
	temp = temp[0];

	result = temp["nick"];

	return result;
}

export default USER_MODULE;