/**
* @file     DHMoudle.js
* @brief    데뷔탕트 하우징의 모든 기능을 모아놓은 모듈
* @details  프론트에서 사용할 기능 및 세부적인 백엔드 모듈을 모아놓음
* @author   PORO
* @date     2023/06/02
* @version  0.1
* @exports	DHM
* @module	DB_Module
*/


var DHM = {};

// DHM.DB = require('./DB/DB_Module');
import db_module from './DB/DB_Module.js';
//DHM.room = require('./room');
import room_module from './room.js';

DHM.DB = db_module;
DHM.room = room_module;

DHM.getRoomCode = DHM.room.getRoomCodeByUserCode;
DHM.loadRoom = DHM.room.load;

var db_data = null;

DHM.init = () => {
	console.log("DHM.init");
	console.log();
	db_data = DHM.DB.connect();
}


/**
* @param    {*} id 아이디
* @param    {*} pw 비밀번호
* @return	`객체` {code, nick, profile}
* @return	`code : -1` 로그인 실패
* @brief    로그인을 시도 함
* @details  로그인 시도를 하며 성공 시 유저의 로그인 정보를 반환함
* @todo	작업 전
*/
DHM.login = (id, pw) => {
	var user_code = -1;
	var nick = "";
	var profile = "";

	console.log("DHM.login");
	console.log("attempt login");
	console.log();
	//db_data.login(id,pw);
	DHM.DB.login(id, pw);

	// dummy
	user_code = 5;
	nick = "test_user";
	profile = "test.png"

	return { "code": user_code, "nick": nick, "profile": profile };
}

DHM.logout = () => {
	console.log("DHM.logout");
	console.log("attempt logout");
	console.log();
}

DHM.loadUserData = (user_code) => {
	console.log("DHM.loadUserData");
	console.log("attempt UserData");
	console.log();
}



/**
* @param    {*} user_code 유저코드
* @return	`객체` {code, name, items, user_code, user_name}
* @return	`code : -1` 가져오기 실패
* @brief    유저가 갖고있는 방 정보를 가져옴
* @details  유저코드를 기반으로 방의 모든 정보를 가져온다.
* @todo	작업 전
*/
DHM.loadRoom = (user_code) => {
	console.log("DHM.loadRoom");
	console.log("attempt loadRoom");
	console.log();

	room_code = DHM.room.getRoomCodeByUserCode(user_code);
	obj = DHM.room.load(room_code);

	return obj;
}

DHM.join = () => {
	console.log("DHM.join");
	console.log("attempt join");
	console.log();
}

DHM.store={};
DHM.store.items = () => {
	var items
	console.log("DHM.store.items");

	console.log("상점에 등록된 아이템을 불러옴")

	items = [
		{code : 0, name : "desk", src : ""},
		{code : 1, name : "chair", src : "test.png"},
		{code : 2, name : "clock", src : ""}
	]

	return items;

}


export default DHM;
//module.exports = DHM;
//export {DHM};
//export {DHM}