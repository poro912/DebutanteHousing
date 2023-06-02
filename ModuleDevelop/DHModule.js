var DHM = {};

DHM.DB = require('./DB/DB_Module');


var db_data = null;

DHM.init = () => {
	console.log("DHMoudle.init");
	db_data = DHM.DB.connect();
}

// 함수, 클래스 독시젠
/**
* @param    {*} id 아이디
* @param    {*} pw 비밀번호
* @return	`객체` code, nick, profile
* @return	`code : -1` 로그인 실패
* @brief    로그인을 시도 함
* @details  로그인 시도를 하며 성공 시 유저의 로그인 정보를 반환함
* @throws   예외상황 설명
*/
DHM.login = (id, pw) => {
	var user_code = -1;
	var nick = "";
	var profile = "";

	console.log("DHMoudle.login");
	console.log("attempt login");
	//db_data.login(id,pw);
	DHM.DB.login(id, pw);

	// dummy
	user_code = 1;
	nick = "test_user";
	profile = "test.png"

	return { "code": user_code, "nick": nick, "profile": profile };
}

DHM.logout = () => {
	console.log("DHMoudle.logout");
	console.log("attempt logout");
}

DHM.loadUserData = (user_code) => {
	console.log("DHMoudle.loadUserData");
	console.log("attempt UserData");
}

DHM.loadRoom = () => {
	console.log("attempt loadRoom");
}

DHM.join = () => {
	console.log("DHMoudle.join");
	console.log("attempt join");
}
module.exports = DHM;