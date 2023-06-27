/**
* @file     DB_Moudle.js
* @brief    방 관련 모듈
* @details  방과 관련된 모듈을 모아놓은 파일
* @author   PORO
* @date     2023/05/30
* @version  0.1
*/
const FILE = 'room.js';
const MODULE_NAME = "ROOM_MOUDLE";
let ROOM_MODULE = {};

/* 현황
code	다중값 반환 형태를 고려해야 함
codes	다중값 반환 형태를 고려해야 함
info	다중값 반환 형태를 고려해야 함
load	다중값 반환 형태를 고려해야 함
loadByUcode	대표 방 정보를 저장할 수 있어야 함
edit	
*/

/**
 * @param	`user_code` 유저코드
 * @return	`room_code` 대표 방 코드
 * @brief	해당유저의 대표 방 코드를 반환한다.
 * @details	user_code를 바탕으로 대표방의 코드를 반환한다.
 * @todo	작업 전
*/
ROOM_MODULE.code = async (args) => {
	const F_NAME = 'code';
	var temp;
	var row, fields;
	var result = {
		code: Number,
		data: String,
	};
    System.Debug.print(MODULE_NAME + " : " + F_NAME);

	// SQL Scropt
	var conn = await DB_system.getConnection();
	//await DB_system.use(conn);
	temp = await DB_system.execQuery(conn, ``);


	// 조회 결과 값 없음
	if (DB_system.checkNodate(temp)) {
		DHM_system.Debug.printError(FILE + " " + F_NAME + "sql no data");
		
		
		// set error data
        result.code = -1;
		result.nick = "";
		return result;
	}

	// process data
	temp = temp[0];
	result.code = temp['code'];

	return result;
}


/**
 * @param	`user_code` 유저코드
 * @return	`[room_code]` 방 코드 배열
 * @brief	해당유저 소유의 모든 방 코드를 반환한다.
 * @details	user_code를 바탕으로 유저가 소유한 모든 방의 코드를 반환한다.
 * @todo	작업 전
*/
ROOM_MODULE.codes = async (args) => {
	const F_NAME = 'codes';
	var temp;
	var row, fields;
	var result = [{
		code: Number,
		data: String,
	}];

    System.Debug.print(MODULE_NAME + " : " + F_NAME);

	// SQL Scropt
	var conn = await DB_system.getConnection();
	//await DB_system.use(conn);
	temp = await DB_system.execQuery(conn, ``);


	// 조회 결과 값 없음
	if (DB_system.checkNodate(temp)) {
		DHM_system.Debug.printError(FILE + " " + F_NAME + "sql no data");
		
		
		// set error data
        result.code = -1;
		result.nick = "";
		return result;
	}

	// process data
	temp = temp[0];
	result.code = temp['code'];

	return result;
}


/**
 * @param	`room_code`	방 코드 
 * @return	
 * @brief	방에 대한 정보를 불러온다.
 * @details	방 코드를 바탕으로 방에 대한 소유 정보, 방 이름 등의 정보를 불러온다.
 * @todo	작업 전
*/
ROOM_MODULE.info = async (args) => {
	const F_NAME = 'info';
	var temp;
	var row, fields;
	var result = {
		code: Number,
		data: String,
	};
    System.Debug.print(MODULE_NAME + " : " + F_NAME);

	// SQL Scropt
	var conn = await DB_system.getConnection();
	//await DB_system.use(conn);
	temp = await DB_system.execQuery(conn, ``);


	// 조회 결과 값 없음
	if (DB_system.checkNodate(temp)) {
		DHM_system.Debug.printError(FILE + " " + F_NAME + "sql no data");
		
		
		// set error data
        result.code = -1;
		result.nick = "";
		return result;
	}

	// process data
	temp = temp[0];
	result.code = temp['code'];

	return result;
}


/**
 * @param	`room_code`	방 코드
 * @param	
 * @return	
 * @brief	방 모습 출력에 필요한 정보를 불러온다.
 * @details	방 코드를 바탕으로 방 출력에 필요한 모든 정보를 불러온다.
 * @todo	작업 전
*/
ROOM_MODULE.load = async (args) => {
	const F_NAME = 'load';
	var temp;
	var row, fields;
	var result = {
		code: Number,
		data: String,
	};
    System.Debug.print(MODULE_NAME + " : " + F_NAME);

	// SQL Scropt
	var conn = await DB_system.getConnection();
	//await DB_system.use(conn);
	temp = await DB_system.execQuery(conn, ``);


	// 조회 결과 값 없음
	if (DB_system.checkNodate(temp)) {
		DHM_system.Debug.printError(FILE + " " + F_NAME + "sql no data");
		
		
		// set error data
        result.code = -1;
		result.nick = "";
		return result;
	}

	// process data
	temp = temp[0];
	result.code = temp['code'];

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
ROOM_MODULE.loadByUcode = async (args) => {
	const F_NAME = 'loadByUcode';
	var temp;
	var row, fields;
	var result = {
		code: Number,
		data: String,
	};
    System.Debug.print(MODULE_NAME + " : " + F_NAME);

	// SQL Scropt
	var conn = await DB_system.getConnection();
	//await DB_system.use(conn);
	temp = await DB_system.execQuery(conn, ``);


	// 조회 결과 값 없음
	if (DB_system.checkNodate(temp)) {
		DHM_system.Debug.printError(FILE + " " + F_NAME + "sql no data");
		
		
		// set error data
        result.code = -1;
		result.nick = "";
		return result;
	}

	// process data
	temp = temp[0];
	result.code = temp['code'];

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
ROOM_MODULE.edit = async (args) => {
	const F_NAME = 'edit';
	var temp;
	var row, fields;
	var result = {
		code: Number,
		data: String,
	};
    System.Debug.print(MODULE_NAME + " : " + F_NAME);

	// SQL Scropt
	var conn = await DB_system.getConnection();
	//await DB_system.use(conn);
	temp = await DB_system.execQuery(conn, ``);


	// 조회 결과 값 없음
	if (DB_system.checkNodate(temp)) {
		DHM_system.Debug.printError(FILE + " " + F_NAME + "sql no data");
		
		
		// set error data
        result.code = -1;
		result.nick = "";
		return result;
	}

	// process data
	temp = temp[0];
	result.code = temp['code'];

	return result;
}


export default ROOM_MODULE;

