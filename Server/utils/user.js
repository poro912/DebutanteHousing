/**
* @file     user.js
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

const db = require('./DB_systeam').module;
const system = require('./DHM_system').module;
//const DHM_system = require('../System/DHM_system.js').module;
const Web3 = require('web3');
const web3 = new Web3(process.env.INFURA_URL);

const user = {
	info : {
		FILE : "utils/user.js",
	},
	/**
 	 * @param	
 	 * @param	
 	 * @return	
	 * @brief	
	 * @details	
	 * @todo	검증전
	*/
	joinIn : async (id, pw, name, nick, email, phone) => {
		
		let result = {
			result : Boolean,
			code: Number,
			id: String,
			nick: String
		};
		var conn = await db.getConnection();
		var temp;

		await db.use.func(conn);
		temp = await db.execQuery(conn,`call user_join("${id}","${pw}","${name}","${nick}");`);
		system.debug.print(temp);

		if(false === temp) {
			result.result = false;
			result.code = -1;
			result.id = "";
			result.nick = "";
		}
		else{
			// usercode 가져오기
			await db.use.personal(conn);
			temp = await db.execQuery(conn,
				`select code from user where id = "${id}";`
			);

			let code = temp[0].code;
			system.debug.print(temp);
			result.result = true;
			result.code = temp[0].code;
			result.id = id;
			result.nick = nick;

			// 지갑 생성 및 데이터 삽입
			try{
				const newAccount = await web3.eth.accounts.create();
				/*const newAccount ={
					address : "A123456",
					privateKey : "A12345678"
				}*/
				console.log(`New Account Address: ${newAccount.address}, New Account privateKey: ${newAccount.privateKey}`);
				await db.use.current(conn);
				temp = await db.execQuery(conn,`insert into new_wallet values(${code}, '${newAccount.address}','${newAccount.privateKey}')`);
			}
			catch(e){
				console.error(e);
			}
			
			user.setEmail(code,email);
			user.setPhone(code,phone);

			//temp = user.getInfo(temp[0].code);
			//result.user = temp.users;

			/*await db.use.view(conn);
			temp = await db.execQuery(conn,`select * from user_wallet_view where user_code = ${code}`);
			result["wallet"] = temp[0];
			*/
			result = user.getInfo(code);
		}
		system.debug.print(result);
		return result;
	},
	
	/**
	 * @param	{*} id 유저가 입력한 ID
	 * @param	{*} pw 유저가 입력한 PW
	 * @return	초기화면을 구성하는데 필요한 데이터를 반환함
	 * @brief	로그인을 시도함
	 * @details	로그인에 성공하면 true 실패하면 false
	 * @todo	작업 전
	*/
	login : async (id, pw) => {
		var result = {
			result : Boolean,
			code : Number,
			nick : String,
			room : Number,
		};
		var temp;

		// user table 정보 가져오기
		var conn = await db.getConnection();
		await db.use.personal(conn);
		temp = await db.execQuery(conn, `SELECT code FROM user WHERE id = "${id}" and pw = "${pw}";`);
		
		system.debug.print("print temp");
		system.debug.print(temp[0]);
		
		if(undefined === temp[0]) temp = -1;
		else temp = temp[0].code;

		return await user.getInfo(temp);
	},

	/**
	 * @param	
	 * @param	
	 * @return	
	 * @brief	
	 * @details	
	 * @todo	작업 전
	*/
	getNick : async (code) => {
		//if(code == undefined) return "";
		var result;
		var temp;
		if (code <= 0) {
			return "";
		}
		system.debug.print("getNick");
		system.debug.print("usercode : ", code);

		var conn = await db.getConnection();
		await db.use.current(conn);
		temp = await db.execQuery(conn, `SELECT nick FROM user WHERE code = "${code}";`);

		if(false === temp) return "";
		temp = temp[0];

		result = temp.nick;

		return result;
	},
	/**
	 * @param	
	 * @param	
	 * @return	
	 * @brief	
	 * @details	
	 * @todo	작업 전
	*/
	getInfo : async (code) => {
		var result = {
			result : Boolean,
			code : Number,
			nick : String,
			room : Number,
		};
		var temp;
		
		system.debug.print("getInfo");
		system.debug.print("usercode : ", code);

		var conn = await db.getConnection();
		await db.use.view(conn);
		temp = await db.execQuery(conn, `select * from room_view where user_code = "${code}"`);

		system.debug.print(temp[0]);

		// 조회 결과 값 없음
		if (db.checkNodate(temp) || code <= 0) {
			system.debug.printError(user.info.FILE + " getInfo()", "sql no data")
			// set error data
			result.result = false;
			result.code = -1;
			result.nick = "";
			result.room = -1;
		}
		else{
			result.result = true;
			result.users = temp[0];
			
			await db.use.view(conn);
			temp = await db.execQuery(conn,`select * from user_wallet_view where user_code = ${code}`);
			result["wallet"] = {
				account : temp[0].account,
				privateKey : temp[0].key
			};
		}
		return result;
	},
	getAllUserInfo : async () => {
		var result = {
			result : Boolean,
			users : [],
			code : Number,
			nick : String,
			room : Number,
		};
		system.debug.print("getAllInfo");

		var conn = await db.getConnection();
		await db.use.view(conn);
		temp = await db.execQuery(conn, `select * from room_view`);

		system.debug.print(temp);

		for (const item of temp) {
			console.log(item);
		}

		if (db.checkNodate(temp)) {
			system.debug.printError(user.info.FILE + " login()", "sql no data")
			// set error data
			result.result = false;
			result.code = -1;
		}
		else{
			result.result = true;
			result.users = temp;
		}
		return result;

	},
	setEmail : async(code, email) =>{
		var conn = await db.getConnection();
		await db.use.personal(conn);
		temp = await db.execQuery(conn,
			`update user set email = "${email}" where code = "${code}";`
		);
	},
	setPhone : async(code, phone) =>{
		var conn = await db.getConnection();
		await db.use.personal(conn);
		temp = await db.execQuery(conn,
			`update user set phone = "${phone}" where code = "${code}";`
		);
	},
	
}
exports.module = user;