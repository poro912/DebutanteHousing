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

const db_user = require('../utils/user').module;
const system = require('../utils/DHM_system').module;


const user ={
	info : {
		FILE : "module/user.js",
	},

	joinIn : async(res, form, callback) => {
		let ret = {
			result : Boolean,
			code : Number,
			id : String,
			nick : String,
		};

		system.debug.print("DHM.join");
		system.debug.print("attempt join");
		system.debug.print("회원가입 시도");
		system.debug.print();

		
		ret = await db_user.joinIn(form.id, form.pw, form.name, form.nick, form.email, form.phone);
		
		//if(-1 == ret.code || false == ret.result ) return false;
		
		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
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
	login : async(res, form, callback) => {
		let result = {
			result: Boolean,
			code : Number,
			nick : String,
			profile : String
		};

		system.debug.print("DHM.login");
		system.debug.print("attempt login");
		system.debug.print();

		ret = await db_user.login(form.id, form.pw);

		//if(-1 == ret.code || false == ret.result ) return false;

		if("function" === typeof callback){
			callback(res, ret);
		}
		else{
			return ret;
		}
		/*
		// dummy
		result.code = temp["code"];
		result.nick = temp["nick"];
		system.debug.print("DHM login result : ", result);

		if("function" === typeof callback){
			callback(result);
		}
		
		return result;
		*/
	},

	


	logout : () => {
		system.debug.print("DHM.logout");
		system.debug.print("attempt logout");
		system.debug.print();
	},
}
exports.module = user;