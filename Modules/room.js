/**
* @file     room.js
* @brief    방에 대한 모듈
* @details  
* @author   PORO
* @date     2023/06/02
* @version  0.1
* @exports	room
* @module	
*/

var room = {};

/**
* @param    {*} user_code 유저코드
* @return	`code` 유저가 소유한 방의 코드
* @return	`-1` 가져오기 실패
* @brief    유저가 갖고있는 방의 코드를 가져옴
* @todo	작업 전
*/
room.getRoomCodeByUserCode = (user_code) => {
	var room_code = -1;
	console.log("room.getRoomCodeByUserCode");
	console.log();

	// dummy data
	room_code = 5;

	return room_code;
}

room.getRoomInfo = () => {
	var room_name = "";
	var room_code = -1;
	console.log("room.getRoomInfo");
	console.log();

	return {
		"name": room_name,
		"code": room_code
	};
}

/**
* @param    {*} room_code 방코드
* @return	`객체` {code, name, items, user_code, user_name}
* @return	`code : -1` 가져오기 실패
* @brief    해당하는 방의 모든 정보를 가져옴
* @details  방코드를 기반으로 방의 정보, 아이템, 소유주 등의 모든 정보를 가져옴
* @todo	작업 전
*/
room.load = (room_code) => {
	var room_name = "";
	var items = {};
	var user_code = -1;
	var user_name = "";
	console.log("room.load");
	console.log();

	// dummy_code
	
	room_name = "poro's room";
	items = [
		{ "code" : 50, "position" : 90501, "rotation" : 0},
		{ "code" : 200, "position" : 40109, "rotation" : 1}
	];
	user_code = 5;
	user_name = "poro";

	return {
		"code": room_code,
		"name": room_name,
		"items": items,
		"user_code": user_code,
		"user_name": user_name
	};
}


export default room;

