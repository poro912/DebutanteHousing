/**
* @file     DB_Moudle.js
* @brief    유저 관련 모듈
* @details  유저 관련된 모듈을 모아놓은 파일
* @details  로그인, 회원가입, 정보변경, 탈퇴, 타 유저 정보 조회
* @author   PORO
* @date     2023/06/22
* @version  0.2
	result = await DB_system.e
* @todo		유저 정보를 얻을 수 있는 모듈을 제작해야 함
* @todo		유저 정보를 변경하는 모듈을 제작해야 함
* @todo		반환 값 설계 진행 후 함께 변경해야 함
* @details	회원가입, 로그인 모듈의 개발이 완료됨
*/

const db = require('../utils/user').module;
const system = require('../utils/DHM_system').module;


const user ={
	info : {
		FILE : "module/user.js",
	},
	/**
	* @param    {*} id 아이디
	* @param    {*} pw 비밀번호
	* @return	`객체` {code, nick, profile}
	* @return	`code : -1` 로그인 실패
	* @brief    로그인을 시도 함
	* @details  로그인 시도를 하며 성공 시 유저의 로그인 정보를 반환함
	* @todo	작업 전
	*/
	login : async(id, pw, callback) => {
		let result = {
			code: Number,
			nick: String,
			profile: String
		};
		// currentTB에서 nick을 가져와야함
		var user_code = 0;
		var nick = "";
		var profile = "";

		console.log("DHM.login");
		console.log("attempt login");
		console.log();
		var temp = await DHM.user.login(id, pw);

		// dummy
		result.code = temp["code"];
		result.nick = temp["nick"];
		console.log("DHM login result : ", result);

		if("function" === typeof callback){
			callback(result);
		}
		
		return result;
	},

	joinIn : async(id, pw, name, nick, email, phone, callback) => {
		let result = {
			code : Number,
			id : String,
			nick : String
		};
		console.log("DHM.join");
		console.log("attempt join");
		console.log("회원가입 시도");
		console.log();

		// non db code
		userdata.push({ 'id': id, 'pw': pw });

		console.log(userdata);
		console.log();
		console.log(userdata[0]);
		console.log();
		// db code
		
		result = await M_user.module.joinIn(id,pw,name,nick,email,phone);
		
		if(-1 == result.code) return false;

		if("function" === typeof callback){
			callback(result);
		}
		return result;
	},


	logout : () => {
		console.log("DHM.logout");
		console.log("attempt logout");
		console.log();
	},
}
exports.module = user;