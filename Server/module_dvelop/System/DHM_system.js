/**
* @file     DHM_system.js
* @brief    DB 관련 모듈 파일
* @details  프로젝트에서 사용할 상수와 시스템 변수들 및 디버깅 모듈을 제공함
* @author   PORO
* @date     2023/06/22
* @version  0.1
*/

let System = {};
System.Debug = {};
System.DEBUG = true;

/**
* @brief    디버깅용 콘솔 출력함수
* @details  입력받은 메시지를 출력시킴
*/
System.Debug.printError = (error_spot , ...messages) => {
	if (!System.DEBUG) return;

	console.log('error occured');
	process.stdout.write(error_spot + ' : ');
	for(const msg of messages){
		console.log(msg);
	}
	console.log();
	return;
}


System.Debug.print = (...messages) => {
	if (!System.DEBUG) return;

	for(const msg of messages){
		console.log(msg);
	}
	console.log();
	return;
}


//export default System;

exports.module = System;


