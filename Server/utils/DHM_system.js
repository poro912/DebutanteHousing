/**
* @file     DHM_system.js
* @brief    DB 관련 모듈 파일
* @details  프로젝트에서 사용할 상수와 시스템 변수들 및 디버깅 모듈을 제공함
* @author   PORO
* @date     2023/06/22
* @version  0.1
*/

const system = {
	/**
	* @brief    디버깅용 콘솔 출력함수
	* @details  입력받은 메시지를 출력시킴
	*/
	DEBUG : true,
	debug : {
		printError : (error_spot , ...messages) => {
			if (!system.DEBUG) return;
		
			console.log('error occured');
			process.stdout.write(error_spot + ' : ');
			for(const msg of messages){
				console.log(msg);
			}
			console.log();
			return;
		},
		print : (...messages) => {
			if (!system.DEBUG) return;
			if (typeof messages[0] === 'object') {
				const obj = messages[0];
				for (const key in obj) {
					if (obj.hasOwnProperty(key)) {
						console.log(`${key}: ${obj[key]}`);
					}
				}
			} else {
				console.log(messages.join(' '));
			}
		}
	},
	form : {
		init : (form) =>{
			for (const key in form) {
				form[key] = "";
			}
			return form;
		},
		checkFill : (form) =>{
			for (const key in form) {
				if(form[key] === undefined){
					return false;
				}
			}
			return true;
		},
		addResult : (form, state, message) =>{
			form['result'] = state;
			form['msg'] = message;
			return form;
		}
	},
}

exports.module = system;


