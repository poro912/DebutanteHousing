import {post} from './axiosSystem';
import {get} from './axiosSystem';

//함수명 기능명뒤에 API붙이기
//변수명이랑 라벨명이랑 같게 처리
export function login(id, pw, callback) {
	post('user/login',
		{id: id, 
		pw: pw}
		,callback);
}

export function signup(id, pw, name, nick, email, phone, callback) {
	post('/user/signup',
		{id: id,
		pw: pw,
		name: name,
		nick: nick,
		email: email,
		phone: phone}
		,callback);
}

export function member(code, page, count, callback) {
	get('/user/member',
		{usercode: code,
		page: page,
		count: count}
		,callback);
}

