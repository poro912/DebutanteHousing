const System = {};

System.DEBUG = true;

/**
* @brief    디버깅용 콘솔 출력함수
* @details  입력받은 메시지를 출력시킴
*/
Debug.printError = (error_spot , ...messages) => {
	if (!System.DEBUG) return;

	console.log('error occured');
	process.stdout.write(error_spot + ' : ');
	for(const msg of messages){
		console.log(msg);
	}
	console.log();
	return;
}


Debug.debugPrint = (...messages) => {
	if (!System.DEBUG) return;

	for(const msg of messages){
		console.log(msg);
	}
	console.log();
	return;
}


export default System;

