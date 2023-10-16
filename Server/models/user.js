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


const user = {
	info: {
		FILE: "module/user.js",
	},

	joinIn: async (res, form, callback) => {
		let ret = {
			result: Boolean,
			code: Number,
			id: String,
			nick: String,
			wallet: Number,
		};

		system.debug.print("model user.join");
		system.debug.print("attempt join");
		system.debug.print("회원가입 시도");
		system.debug.print();

		ret = await db_user.joinIn(form.id, form.pw, form.name, form.nick, form.email, form.phone);

		if ("function" === typeof callback) {
			callback(res, ret);
		}
		else {
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
	login: async (res, form, callback) => {
		let ret = {
			result: Boolean,
			code: Number,
			id: String,
			nick: String,
			profile: String,
			wallet: Number,
		};

		system.debug.print("model user.login");
		system.debug.print("attempt login");
		system.debug.print();

		ret = await db_user.login(form.id, form.pw);

		//if(-1 == ret.code || false == ret.result ) return false;

		if ("function" === typeof callback) {
			callback(res, ret);
		}
		else {
			return ret;
		}
	},


	logout: () => {
		system.debug.print("model user.logout");
		system.debug.print("attempt logout");
		system.debug.print();
	},


	getUser: async (res, form, callback) => {
		let ret = {
			result: Boolean,
			count: Number,
			users: [
				{
					code: Number,
					id: String,
					nick: String,
					profile: String,
					wallet: Number,
				}
			],
		}

		system.debug.print("model user.getUser");
		system.debug.print("attempt get userInfo");
		system.debug.print();

		// 전체 데이터 탐색
		if (form.usercode === undefined || form.usercode <= 0) {
			let temp = await db_user.getAllUserInfo();

			if (temp.result) {
				ret.result = temp.result;
				ret.count = 10;
				ret.users = temp.users;
			}
			else {
				system.form.addResult(form, false, "error, data not found");
			}
		}
		// 특정 유저 데이터 탐색
		else {
			let temp = await db_user.getInfo(form.usercode);
			if (temp.result) {
				ret.result = temp.result;
				ret.count = 10;
				ret.users = temp.users;
			}
			else {
				system.form.addResult(form, false, "error, data not found");
			}
		}

		if ("function" === typeof callback) {
			callback(res, ret);
		}
		else {
			return ret;
		}
	},

	getUserByWallet: async (res, form, callback) => {
		let ret = {
			result: Boolean,
			count: Number,
			users: [
				{
					code: Number,
					id: String,
					nick: String,
					profile: String,
					wallet: Number,
				}
			],
		}

		system.debug.print("model user.getUserByWallet");
		system.debug.print();

		// 전체 데이터 탐색
		let temp = await db_user.getInfoByWallet(form.wallet);
		if (temp.result) {
			ret.result = temp.result;
		}
		else {
			system.form.addResult(form, false, "error, data not found");
		}

		if ("function" === typeof callback) {
			callback(res, ret);
		}
		else {
			return ret;
		}
	}
}
exports.module = user;