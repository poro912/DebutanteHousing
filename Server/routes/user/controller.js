const express = require('express');
const Router = express();
// const Model = require('../../models/대충 쿼리들어있는 모델')

const Controller = {
    postSignup : (req, res) => {
        // 대충 회원가입 등록 처리 코드
        console.log('signup');
    },
    getMember : (req, res) => {
        // 대충 회원 정보 조회 처리 코드
    },
    editMember : (req, res) => {
        // 대충 회원 정보 수정 처리 코드
    },
    postLogin : (req, res) => {
        // 대충 로그인 처리 코드
    }
}

/**
 * 회원가입 등록
 */
Router.post('/signup', Controller.postSignup)

/**
 * 회원정보 조회
 */
Router.get('/member', Controller.getMember)

/**
 * 회원정보 수정W
 */
Router.post('/member', Controller.editMember)

/**
 * 로그인 처리
 */
Router.post('/login', Controller.postLogin)


//module.exports = Controller;
module.exports = Router;