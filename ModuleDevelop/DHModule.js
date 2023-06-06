/**
* @file     DHMoudle.js
* @brief    데뷔탕트 하우징의 모든 기능을 모아놓은 모듈
* @details  프론트에서 사용할 기능 및 세부적인 백엔드 모듈을 모아놓음
* @details	다른 곳에 선언된 함수를 쉽게 사용할 수 있도록 모아놓은 모듈(프록시) 모든 함수의 반환형태를 보여줌
* @author   PORO
* @date     2023/06/06
* @version  0.1
* @exports	DHM
* @module	DB_Module
*/

// import extern module
import db_module from './DB/DB_Module.js';



import room_module from './room.js';

var DHM = {};

// module declare
DHM.DB = db_module;
DHM.ROOM = room_module;

import M_user from './user.js';
//import M_room from './room.js';
//import M_inventory './inventory.js';
//import M_edit from './edit.js';
//import M_store from './store.js';
//import M_nft from './nft.js';
//import M_item from './item.js';
DHM.user = M_user;
DHM.inventory = {};
DHM.room = {};
DHM.edit = {};
DHM.store = {};
DHM.nft = {};
DHM.item = {};



DHM.getRoomCode = DHM.ROOM.getRoomCodeByUserCode;
DHM.loadRoom = DHM.ROOM.load;

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

DHM.join = () => {
	console.log("DHM.join");
	console.log("attempt join");
	console.log("회원가입 시도");
	console.log();
}

// DHM.user------------------------------------------------------------------------------

DHM.user.getInfo = (user_code) => {
	console.log("user_code로 해당 유저에 대한 공개 정보를 가져온다.")
}

DHM.user.setInfo = (user_datas) => {
	console.log("유저 정보를 수정한다.")
}

DHM.user.loadUserData = (user_code) => {
	console.log("DHM.loadUserData");
	console.log("attempt UserData");
	console.log();
}

// DHM.inventory-------------------------------------------------------------------------
DHM.inventory.getItems = (user_code) => {
	console.log("유저가 소유한 아이템 리스트를 반환함");
}
DHM.inventory.sellItem = (user_code, item_code) => {
	console.log("유저가 소유한 아이템을 판매함");
}
DHM.inventory.sellNFT  = () =>{
	console.log("유저가 소유한 NFT를 판매함");
}
// DHM.room------------------------------------------------------------------------------

DHM.room.getCode = (user_code) => {
	console.log("유저코드로 유저가 소유한 방 코드를 반환");
}

DHM.room.getCodes = (user_code) => {
	console.log("유저코드로 유저가 소유한 방 코드리스트를 반환");
}

DHM.room.getRoomInfo = (room_code) => {
	console.log("방 코드로 방에 대한 정보를 가져옴");
}

DHM.room.getRoomInfos = (room_code_list) => {
	console.log("방 코드 리스트를 바탕으로 방에 대한 정보를 가져옴");
}


/**
* @param    {*} room_code 방 코드
* @return	`객체` {code, name, items, user_code, user_name}
* @return	`code : -1` 가져오기 실패
* @brief    해당 방의 모든 데이터를 가져온다.
* @details  방 코드를 기반으로 방의 모든 정보를 가져온다.
* @todo	작업 전
*/
DHM.loadRoom = (room_code) => {
	console.log("DHM.loadRoom");
	console.log("attempt loadRoom");
	console.log();

	room_code = DHM.room.getRoomCodeByUserCode(user_code);
	obj = DHM.room.load(room_code);

	return obj;
}

/**
* @param    {*} user_code 유저코드
* @return	`객체` {code, name, items, user_code, user_name}
* @return	`code : -1` 가져오기 실패
* @brief    유저가 갖고있는 대표 방의 방 정보를 가져옴
* @details  유저코드를 기반으로 방의 모든 정보를 가져온다.
* @todo	작업 전
*/
DHM.loadRoomByUserCode = (user_code) => {
	console.log("DHM.loadRoomByUserCode");
	console.log("attempt loadRoom");
	console.log();

	room_code = DHM.room.getRoomCodeByUserCode(user_code);
	obj = DHM.room.load(room_code);

	return obj;
}


DHM.room.edit = (user_code, room_code) => {

}

DHM.room.editAble = (user_code, room_code) => {
	console.log("방에 대한 수정이 가능한가 확인한다.");
	console.log("권한 및 작업자 확인(동기화)");
	// 추후 room 파일로 옮길 가능성 다분함
}



// DHM.edit------------------------------------------------------------------------------
DHM.edit.moveItem = (user_code, room_code, item_code, positoin) => {
	console.log("방 안의 아이템 위치를 움직인다.");
}

DHM.edit.rotateItem = (user_code, room_code, item_code, rotation) => {
	console.log("방 안의 아이템 각도를 변경한다.");
}

DHM.edit.placeItem = (user_code, room_code, item_code, positoin, rotatoin) => {
	console.log("방 안의 아이템을 제거한다.");
}

DHM.edit.removeItem = (user_code, room_code, item_code) => {
	console.log("방 안의 아이템을 제거한다.");
}

DHM.edit.clear = (user_code, room_code) => {
	console.log("방 안의 모든 아이템을 제거한다.");
}


// DHM.store-----------------------------------------------------------------------------
DHM.store.items = () => {
	var items = [{ code: -1, name: "", src: "" }];
	console.log("DHM.store.items");

	console.log("상점에 등록된 아이템을 불러옴")

	items = [
		{ code: 0, name: "desk", src: "" },
		{ code: 1, name: "chair", src: "test.png" },
		{ code: 2, name: "clock", src: "" }
	]

	return items;

}

DHM.store.nfts = () => {
	console.log("상점에 등록된 NFT를 불러옴")
}

DHM.store.buyItem = (item_code) => {
	console.log("아이템을 구매한다.");
}

DHM.store.buyNft = (nft_code) => {
	console.log("nft를 구매한다.");
}

// DHM.nft------------------------------------------------------------------------------

DHM.nft.regist = (user_code, nft_data) => {
	console.log("NFT를 등록한다.");
}

DHM.nft.supply = (user_code, nft_code, count) => {
	console.log("상점에 아이템을 count개 공급한다.");
}

DHM.nft.getInfo = (nft_code) => {
	console.log("해당 nft의 정보를 가져온다.");
}

DHM.nft.getStock = (nft_code) => {
	console.log("nft의 시장가를 확인한다.");
	console.log("평균 거래가, 최저 거래가, 최대 거래가, 시간대별 거래 가격");
}

// DHM.item-----------------------------------------------------------------------------

DHM.item.getInfo = (item_code) => {

}


export default DHM;

