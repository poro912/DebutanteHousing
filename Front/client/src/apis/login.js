// api.js
import axios from 'axios';

//함수명 기능명뒤에 API붙이기
//변수명이랑 라벨명이랑 같게 처리
export function login(id, pw, callback) {
    //@notion 콜백함수로 처리하여 err 핸들링
  axios
    .post('http://localhost:8080/user/login', {
      id: id,
      pw: pw,
    })
    .then(response => {
      callback(null, response.data); // 성공 시 콜백 호출
    })
    .catch(error => {
      callback(error, null); // 실패 시 콜백 호출
    });
}