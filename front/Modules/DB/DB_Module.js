var DHM = {};
var room = {};

DHM.DB = require('./DB/DB_Module');
DHM.room = require('./room');

DHM.getRoomCode = DHM.room.getRoomCodeByUserCode;
DHM.loadRoom = DHM.room.load;

/**
* @param    {*} user_code 유저코드
* @return   `code` 유저가 소유한 방의 코드
* @return   `-1` 가져오기 실패
* @brief    유저가 갖고있는 방의 코드를 가져옴
* @todo   작업 전
*/
room.getRoomCodeByUserCode = (user_code) => {
   var room_code = -1;
   console.log("room.getRoomCodeByUserCode");
   console.log();

   // dummy data
   room_code = 5;

   return room_code;
}


/**
* @param    {*} room_code 방코드
* @return   `객체` {code, name, items, user_code, user_name}
* @return   `code : -1` 가져오기 실패
* @brief    해당하는 방의 모든 정보를 가져옴
* @details  방코드를 기반으로 방의 정보, 아이템, 소유주 등의 모든 정보를 가져옴
* @todo   작업 전
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


module.exports = room;




/**
* @param    {*} id 아이디
* @param    {*} pw 비밀번호
* @return   `객체` {code, nick, profile}
* @return   `code : -1` 로그인 실패
* @brief    로그인을 시도 함
* @details  로그인 시도를 하며 성공 시 유저의 로그인 정보를 반환함
* @todo   작업 전
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