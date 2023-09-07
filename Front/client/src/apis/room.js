import {post} from './axiosSystem';
import {get} from './axiosSystem';


export function info(code, callback) {
	get('/room/info',
		{code: code}
		,callback);
}
export function place(code, items, callback) {
	post('/room/info',
		{code: code
		,items:items}
		,callback);
}
export function replace(code, items, callback) {
	post('/room/info',
		{code: code
		,items:items}
		,callback);
}
export function remove(code, items, callback) {
	post('/room/info',
		{code: code
		,items:items}
		,callback);
}


export function genVector(x, y, z){
	return {x:x,
		y:y,
		z:z};
}

export function genItem(code, position, rotate){
	return {item_code:code,
		position:position,
		rotate:rotate};
}

export function genItemWithVector(code, px, py, pz, rx, ry, rz){
	return genItem(code, genVector(px,py,pz), genVector(rx,ry,rz));
}

