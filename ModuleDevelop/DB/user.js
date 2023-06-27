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

import DB_system from '../System/DB_Systeam.js';
import System from '../System/DHM_system.js';
import DHM_system from '../System/DHM_system.js';

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
	let result = {
		code: Number,
		id: String,
		nick: String
	};
	var conn = await DB_system.getConnection();
	var code = 901;
	var temp;

	await DB_system.usePersonal(conn);
	temp = await DB_system.execQuery(conn,
		`insert into user (code, id, pw, name, email, phone) 
		values("${code}","${id}","${pw}","${name}","${email}","${phone}");`
	);
	System.Debug.print(temp);
	if(false === temp) return false;

	await DB_system.useCurrent(conn);
	temp = await DB_system.execQuery(conn,
		`insert into user (code, id, nick) 
		values("${code}","${id}","${nick}");`
	);
	if(false === temp) return false;

	System.Debug.print(temp);
	result.code = 901;
	result.id = id;
	result.nick = nick;
	return result;
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
	if (DB_system.checkNodate(temp)) {
		DHM_system.Debug.printError(FILE + " login()", "sql no data")
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
}


/**
 * @param	
 * @param	
 * @return	
 * @brief	
 * @details	
 * @todo	작업 전
*/
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
	
	if(false === temp) return false;
	temp = temp[0];

	result = temp["nick"];

	return result;
}


/**
 * @param	
 * @param	
 * @return	
 * @brief	
 * @details	
 * @todo	작업 전
*/
USER_MODULE.getInfo = async (code = 0) => {
    var result = {
		code: Number,
		nick: String,
	};
	var temp;
	var row, fields;
    
    console.log('USER : getInfo');


    // SQL commands
	// user table 정보 가져오기
	var conn = await DB_system.getConnection();
	await DB_system.useCurrent(conn);
	temp = await DB_system.execQuery(conn, ``);


	// 조회 결과 값 없음
	if (DB_system.checkNodate(temp)) {
		DHM_system.Debug.printError(FILE + " login()", "sql no data")
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


export default USER_MODULE;