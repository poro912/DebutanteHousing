const db_room = require('../utils/room').module;
const system = require('../utils/DHM_system').module;

const room ={
	info : {
		FILE : "module/room.js",
	},

	getRoomInfo : async(res, form, callback) => {
		let ret = {
			result: Boolean,
			code : Number,
			nick : String,
			profile : String,
			roomData : [],
		};

		system.debug.print("model room.getRoomInfo");
		system.debug.print("attempt getRoomInfo");
		
		ret = await db_room.getRoomInfo(form.code);

		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
	},

	getRoom : async(res, form, callback) => {
		let ret = {
			result: Boolean,
			code : Number,
			nick : String,
			profile : String,
		};

		system.debug.print("model user.login");
		system.debug.print("attempt login");
		system.debug.print();

		ret = await db_user.login(form.id, form.pw);

		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
	}
}

exports.module = room;