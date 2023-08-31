/**
* @file     room.js
* @brief    방 관련 모듈
* @details  방 관련된 모듈을 모아놓은 파일
* @details  방 내용 조회, 변경
* @author   PORO
* @date     2023/08/31
* @version  0.1
*/


const db = require('./DB_systeam').module;
const system = require('./DHM_system').module;

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
	getRoomInfo : async (id, pw, name, nick, email, phone) => {
		var result = {
			
		};
		var temp;
		
		system.debug.print("");
		system.debug.print(" : ", code);

		var conn = await db.getConnection();
		await db.use.view(conn);
		temp = await db.execQuery(conn, `select * from room_view where user_code = "${code}"`);

		system.debug.print(temp[0]);

		// 조회 결과 값 없음
		if (db.checkNodate(temp) || code <= 0) {
			system.debug.printError(user.info.FILE + " getInfo()", "sql no data")
			// set error data
			result.result = false;
			result.code = -1;
			result.nick = "";
			result.room = -1;
		}
		else{
			result.result = true;
			result.users = temp[0];
		}
		return result;
	},







}



