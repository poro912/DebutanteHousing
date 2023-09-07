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
			items : [],
		};
		system.debug.print("getRoomInfo function");

		var temp;
		var conn = await db.getConnection();
		var user_temp, items_temp;

		//user_nick, profile, room_name
		await db.use.view(conn);
		user_temp = await db.execQuery(conn, `select user_nick, room_name from room_view where room_code = "${code}";`);
		
		system.debug.print(user_temp[0]);

		//item_data
		items_temp = await db.execQuery(conn, `select item_code, nft_code, item_name, item_path, position, rotate from room_item_nft_view where room_code = "${code}";`);
		items_temp = room.convertPositionArray(items_temp);
		items_temp = room.convertRotateArray(items_temp);

		// 조회 결과 값 없음
		if (db.checkNodate(user_temp) || code <= 0 ) {
			system.debug.printError(room.info.FILE + " getInfo()", "sql no data")
			// set error data
			result.result = false;
			result.code = -1;
			result.nick = "";
			result.room = -1;
		}
		else {
			result.result = true;
			result.room_info = user_temp;
			result.items = items_temp;
		}
		return result;
	},

	placeItem : async (conn, room_code, item_code) => {
		system.debug.print("place Item function");
		await db.use.current(conn);
		result = user_temp = await db.execQuery(conn, 
			`insert into 
			room_item(r_code, i_code, position, rotate) 
			values ( ${room_code}, ${item_code}, 0, 0);`);
		system.debug.print(result);
		system.debug.print(result[0]);
	},

	removeItem : async (conn, room_code, item_code) =>{
		system.debug.print("removeItem function");
		await db.use.current(conn);
		result = user_temp = await db.execQuery(conn, 
			`delete from room_item 
			where r_code = ${room_code} and i_code = ${item_code};`);
		system.debug.print(result);
		system.debug.print(result[0]);
	},

	replaceItem : async (conn, room_code, item_code, position, rotate) =>{
		system.debug.print("removeItem function");
		await db.use.current(conn);
		result = user_temp = await db.execQuery(conn, 
			`update room_item 
			set 
			position = ${position}, 
			rotate = ${rotate} 
			where 
			r_code = ${room_code} and 
			i_code = ${item_code};`);
		
		system.debug.print(result);
		system.debug.print(result[0]);
	},


	convertPositionArray : (obj)  =>{
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["position"] === undefined) continue;
			obj[i]["position"] = room.itoaVector(obj[i]["position"]);
		}
		return obj
	},

	convertPositionINT : (arr) => {
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["position"] === undefined) continue;
			obj[i]["position"] = room.atoiVector(obj[i]["position"]);
		}
		return obj
	},

	convertRotateArray : (obj)  =>{
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["rotate"] === undefined) continue;
			obj[i]["rotate"] = room.itoaVector(obj[i]["rotate"]);
		}
		return obj
	},

	convertRotateINT : (arr) => {
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["rotate"] === undefined) continue;
			obj[i]["rotate"] = room.atoiVector(obj[i]["rotate"]);
		}
		return obj
	},

	// array to int, 배열을 정수로 변환하여 반환함
	// [ x, y, z ]
	// 00 00 00
	atoiVector : (data) => {
		// 0 <= x y z <= 20
		var x = Number.isInteger(data[0]) ? data[0] : 0;
  		var y = Number.isInteger(data[1]) ? data[1] : 0;
  		var z = Number.isInteger(data[2]) ? data[2] : 0;

  		return x * 10000 + y * 100 + z;
	},

	// int to array, 정수를 배열로 변환하여 반환함
	itoaVector : (data) => {
		// 0 <= x y z <= 20
		var z = data % 100;
		data = Math.floor(data / 100);
		var y = data % 100;
		data = Math.floor(data / 100);
		var x = data % 100;

		return [x, y, z];
	},
}

exports.module = room;

