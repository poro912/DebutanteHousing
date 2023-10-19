//import {get} from './axiosSystem';
import {put} from './axiosSystem';
import {post} from './axiosSystem';
//import {dele} from './axiosSystem';


export function info(code, callback) {
	console.log("룸 인포", code)
	post('room',
		{code: code}
		,callback);
}
export function place(code, items, callback) {
	console.log("플레이스", items)
	post('room/item',
		{code: code
		,items:items}
		,callback);
}
export function replace(code, items, callback) {
	console.log("리플레이스", items)
	put('room/item',
		{code: code
		,items:items}
		,callback);
}
export function remove(code, items, callback) {
	console.log("리무브", items)
	console.log(code, items)
	post('room/item/delete',
		{code: code
		,items:items}
		,callback);
}

export function setColor(code, color, callback) {
	console.log("방 색 변경", color)
	put('room/color',
		{code: code
		,color:color}
		,callback);
}

export function like(code, callback) {
	console.log("좋아요")
	put('room/like/'+ code,
		{}
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

