// DB 모듈 베이스
import DHM_system from '../System/DHM_system.js';

const FIEL = '';
const MODULE_NAME = "";



/**
 * @param	
 * @param	
 * @return	
 * @brief	
 * @details	
 * @todo	작업 전
*/
moudle.functoin = async (args) => {
	const F_NAME = '';
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


