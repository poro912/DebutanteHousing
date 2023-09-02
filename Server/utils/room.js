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

const room = {
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
	getRoomInfo : async (code) => {
		var result = {
			user_nick : String,
			profile : String,
			room_name : String,
			room_data : [],
		};
		system.debug.print("getRoomInfo function");

		var temp;
		var conn = await db.getConnection();
		var user_temp, room_temp;

		system.debug.print("getconn");

		//user_nick, profile, room_name
		await db.use.view(conn);
		user_temp = await db.execQuery(conn, `select user_nick, room_name from room_view where room_code = "${code}";`);
		
		system.debug.print(user_temp[0]);

		//room_data
		room_temp = await db.execQuery(conn, `select item_code, nft_code, item_name, item_path, position, rotate from room_item_nft_view where room_code = "${code}";`);
		room_temp = room.convertPositionArray(room_temp);

		system.debug.print(room_temp[0]);

		// 조회 결과 값 없음
		if (db.checkNodate(user_temp) || code <= 0 ) {
			system.debug.printError(room.info.FILE + " getInfo()", "sql no data")
			// set error data
			result.result = false;
			result.code = -1;
			result.nick = "";
			result.room = -1;
		}
		else{
			result.result = true;
			result.room_info = user_temp;
			result.room_data = room_temp;
		}
		return result;
	},
	convertPositionArray : (obj)  =>{
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["position"] === undefined) continue;
			obj[i]["position"] = room.itoaPosition(obj[i]["position"]);
		}
		return obj
	},

	convertPositionINT : (arr) => {
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["position"] === undefined) continue;
			obj[i]["position"] = room.atoiPosition(obj[i]["position"]);
		}
		return obj
	},

	// array to int, 배열을 정수로 변환하여 반환함
	// [ x, y, z ]
	// 00 00 00
	atoiPosition : (positions) => {
		// 0 <= x y z <= 20
		var x = Number.isInteger(positions[0]) ? positions[0] : 0;
  		var y = Number.isInteger(positions[1]) ? positions[1] : 0;
  		var z = Number.isInteger(positions[2]) ? positions[2] : 0;

  		return x * 10000 + y * 100 + z;
	},

	// int to array, 정수를 배열로 변환하여 반환함
	itoaPosition : (position) => {
		// 0 <= x y z <= 20
		var z = position % 100;
		position = Math.floor(position / 100);
		var y = position % 100;
		position = Math.floor(position / 100);
		var x = position % 100;

		return [x, y, z];
	},
}

exports.module = room;

