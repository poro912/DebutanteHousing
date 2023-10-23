// api.js
import axios from 'axios';

//함수명 기능명뒤에 API붙이기
//변수명이랑 라벨명이랑 같게 처리

export const info = {
	protocol : "http://",
	// protocol : "https://",
	serverIp : "182.220.199.210",
	// serverIp : "localhost",
	port : "3310",
	GenURL(){
		return this.protocol + this.serverIp + ":" + this.port + "/";
	}
}

export const get = (page, data, callback) => {
	axios
	.get(info.GenURL() + page, data)
	.then(response => {
		callback(null, response.data); // 성공 시 콜백 호출
	})
	.catch(error => {
		callback(error, null); // 실패 시 콜백 호출
	});
}

export const post = (page, data, callback) => {
	
	axios
	.post(info.GenURL() + page, data)
	.then(response => {
		callback(null, response.data); // 성공 시 콜백 호출
	})
	.catch(error => {
		callback(error, null); // 실패 시 콜백 호출
	});
}


export const put = (page, data, callback) => {
	axios
	.put(info.GenURL() + page, data)
	.then(response => {
		callback(null, response.data); // 성공 시 콜백 호출
	})
	.catch(error => {
		callback(error, null); // 실패 시 콜백 호출
	});
}


export const dele = (page, data, callback) => {
	console.log(data)
	axios
	.delete(info.GenURL() + page, data)
	.then(response => {
		callback(null, response.data); // 성공 시 콜백 호출
	})
	.catch(error => {
		callback(error, null); // 실패 시 콜백 호출
	});
}

export const cpost = (page, data, messge, callback) => {
	
	axios
	.post(info.GenURL() + page, data)
	.then(response => {
		callback(null, response.data); // 성공 시 콜백 호출
		alert(messge+" 성공했습니다")
	})
	.catch(error => {
		callback(error, null); // 실패 시 콜백 호출
		alert(messge+" 실패했습니다")
	});
}
