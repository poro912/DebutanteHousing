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
		var user_temp, items_temp;
		//user_nick, profile, room_name

		var conn = await db.getConnection();
		await db.use.view(conn);
		user_temp = await db.execQuery(conn, `select user_nick, room_name from room_view where room_code = "${code}";`);
		
		system.debug.print(user_temp[0]);

		db.deleteConnection(conn);

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
			result.items = await room.getRoomItems(conn, code);
		}
		return result;
	},

	placeItems : async (room_code, items) => {
		system.debug.print("place Items function");
		let result = true;

		var conn = await db.getConnection();
		await db.use.current(conn);
		var cnt = 0;
		
		system.debug.print(items);
		//system.debug.print(items[0]);
		//system.debug.print(items[0][0]);

		for (const item of items) {
			system.debug.print(item);
			temp = await room.placeItem(conn, room_code, item.code ,item.url, item.name);
		}
		//if(items.length == cnt) result = true;

		db.deleteConnection(conn);

		system.debug.print(result);
		system.debug.print();
		return result;
	},
	removeItems : async (room_code, items) => {
		system.debug.print("remove Items function");
		let result = false;

		var conn = await db.getConnection();
		await db.use.current(conn);
		var cnt = 0;

		for (const item of items) {
			system.debug.print(item);
			temp = await room.removeItem(conn, room_code, item);
			if(temp["affectedRows"] != 0) cnt += temp["affectedRows"];
		}

		if(items.length == cnt) result = true;

		db.deleteConnection(conn);

		system.debug.print(result);
		system.debug.print();
		return result;
	},
	replaceItems : async (room_code, items) => {
		system.debug.print("replace Items function");
		system.debug.print();
		let result = false;

		if(items.length == 0 || items === undefined) return false;

		var conn = await db.getConnection();
		await db.use.current(conn);

		for (const item of items) {	
			system.debug.print(item);
		}
		
		items = room.convertPositionINT(items);
		items = room.convertRotateINT(items);

		for (const item of items) {	
			system.debug.print(item);
		}
		
		var cnt = 0;

		for (const item of items) {	
			temp = await room.replaceItem(conn, room_code, item.code, item.pos, item.rot);
			if(temp["changedRows"] != 0) cnt += temp["changedRows"];
		}

		system.debug.print("cnt :", cnt);

		if(items.length == cnt) result = true;

		db.deleteConnection(conn);
		
		system.debug.print("result ",result);
		system.debug.print();
		return result;
	},

	placeItem : async (conn, room_code, item_code, item_url, item_name) => {
		system.debug.print("place Item function");
		await db.use.func(conn);
		result  = await db.execQuery(conn, 
			`call create_item(${room_code}, '${item_code}', '${item_url}', '${item_name}');`);
		system.debug.print(result);
		system.debug.print(result[0]);
		return result;
	},

	removeItem : async (conn, room_code, item_code) =>{
		system.debug.print("removeItem function");
		await db.use.current(conn);
		result  = await db.execQuery(conn, 
			`delete from new_room_item 
			where r_code = ${room_code} and code = ${item_code};`);
		system.debug.print(result);
		system.debug.print(result[0]);
		return result;
	},

	replaceItem : async (conn, room_code, item_code, position, rotate) =>{
		system.debug.print("replaceItem function");
		await db.use.current(conn);
		result  = await db.execQuery(conn, 
			`update new_room_item set position = ${position}, rotate = ${rotate} where r_code = ${room_code} and code = ${item_code};`
		);
		system.debug.print(result);
		system.debug.print(result[0]);
		return result;
	},

	// 정수를 배열로 변환
	convertPositionArray : (obj)  =>{
		system.debug.print(obj);
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["pos"] === undefined) continue;
			obj[i]["pos"] = room.itoaVector(obj[i]["pos"]);
		}
		return obj
	},

	// 배열을 정수로 변환
	convertPositionINT : (obj) => {
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["pos"] === undefined) continue;
			obj[i]["pos"] = room.atoiVector(obj[i]["pos"]);
		}
		return obj;
	},

	convertRotateArray : (obj)  =>{
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["rot"] === undefined) continue;
			//obj[i]["rot"] = room.itoaVector(obj[i]["rot"]);
			
			var data = obj[i]["rot"];
			var z = data % 100;
			data = Math.floor(data / 100);
			var y = data % 100;
			data = Math.floor(data / 100);
			var x = data % 100;

			obj[i]["rot"] = [x, y-1, z];
		}
		return obj;
	},

	convertRotateINT : (obj) => {
		for (let i = 0; i < obj.length; i++) {
			if(obj[i]["rot"] === undefined) continue;
			//obj[i]["rot"] = room.atoiVector(obj[i]["rot"]);

			var data = obj[i]["rot"];
			var x = data[0] ;
			var y = data[1] ;
			var z = data[2] ;

			obj[i]["rot"] = x * 10000 + y * 100 + z;
		}
		return obj;
	},

	// array to int, 배열을 정수로 변환하여 반환함
	// [ x, y, z ]
	// 00 00 00
	atoiVector : (data) => {
		// 범위 외의 데이터 삽입 방지
		// 0 <= x y z <= 20
		//var x = Number.isInteger(data[0]) ? data[0] : 0;
  		//var y = Number.isInteger(data[1]) ? data[1] : 0;
  		//var z = Number.isInteger(data[2]) ? data[2] : 0;

		// U시스템 이전 임시코드 -0.50~+0.49
		var x = data[0] ;
  		var y = data[1] ;
  		var z = data[2] ;
		  system.debug.print(x,y,z);
		x = x.toFixed(2);
		y = y.toFixed(2);
		z = z.toFixed(2);
		system.debug.print(x,y,z);
		x = (x * 100) + 50;
		y = (y * 100) + 50;
		z = (z * 100) + 50;

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

		// U시스템 이전 임시코드 -0.50~+0.49
		x = (x - 50) / 100;
		y = (y - 50) / 100;
		z = (z - 50) / 100;

		return [x, y, z];
	},

	getRoomItems : async(conn, code) =>{
		items_temp = await db.execQuery(conn, `select code, url, name, pos, rot from room_item_view where room_code = "${code}";`);
		items_temp = room.convertPositionArray(items_temp);
		items_temp = room.convertRotateArray(items_temp);


		// items_temp = await db.execQuery(conn, `select item_code as id , nft_code, item_name, item_path, position as pos, rotate as rot from room_item_nft_view where room_code = "${code}";`);
		// items_temp = room.convertPositionArray(items_temp);
		// items_temp = room.convertRotateArray(items_temp);
		return items_temp
	}
}

exports.module = room;

