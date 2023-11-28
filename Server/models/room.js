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

		system.debug.print("model room.getRoom");
		system.debug.print("attempt login");
		system.debug.print();

		//ret = await db_room.getRoom

		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
	},

	replaceItems : async(res, form, callback) => {
		let ret = {
			result: Boolean,
			code : Number,
			nick : String,
			profile : String,
		};

		system.debug.print("model room.replaceItems");
		system.debug.print("attempt replace item");
		
		
		//system.debug.print("model form iteams : ");
		//system.debug.print(form.items);

		ret = await db_room.replaceItems(form.code, form.items);	

		if(ret) {
			ret = await db_room.getRoomInfo(form.code);
			//ret[result] = true;
		}
		else {
			ret = await db_room.getRoomInfo(form.code);
			//ret[result] = false;
		}
		
		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
	},
	placeItems : async(res, form, callback) => {
		let ret = {
			result: Boolean,
			code : Number,
			nick : String,
			profile : String,
		};

		system.debug.print("model room.placeItems");
		system.debug.print("attempt place item");
		system.debug.print();

		ret = await db_room.placeItems(form.code, form.items);	

		if(ret) {
			ret = await db_room.getRoomInfo(form.code);
		}

		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
	},
	deleteItems : async(res, form, callback) => {
		let ret = {
			result: Boolean,
			code : Number,
			nick : String,
			profile : String,
		};

		system.debug.print("model room.deleteItems");
		system.debug.print("attempt delete item");
		system.debug.print();

		ret = await db_room.removeItems(form.code, form.items);	

		if(ret) {
			ret = await db_room.getRoomInfo(form.code);
		}
		
		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
	},

	like : async(res, form, callback) => {
		let ret = {
			result: Boolean,
		};

		system.debug.print("model room.like");

		ret = await db_room.like(form.code);	

		//if(ret) {
		//	ret = await db_room.getRoomInfo(form.code);
		//}
		
		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
	},

	changeColor : async(res, form, callback) => {
		let ret = {
			result: Boolean,
			code : Number,
			nick : String,
			profile : String,
		};

		system.debug.print("model room.changeColor");
		system.debug.print("attempt change roomColor");

		ret = await db_room.changeColor(form.code, form.color);

		if(ret) {
			ret = await db_room.getRoomInfo(form.code);
			//ret[result] = true;
		}
		else {
			ret = await db_room.getRoomInfo(form.code);
			//ret[result] = false;
		}
		
		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
	},

	postComment : async(res, form, callback)=>{
		var ret = {
			result: Boolean,
		};

		system.debug.print("model room.postComment");
		system.debug.print("attempt posting comment");

		ret.result = await db_room.registComment(form.room_code, form.user_code, form.content);

		//system.debug.print(ret.result);

		if(ret.result === true){
			ret = await db_room.getRoomInfo(form.room_code);
		}

		if("function" === typeof callback){	
			callback(res, ret);
		}
		else{
			return ret;
		}
	},
}

exports.module = room;