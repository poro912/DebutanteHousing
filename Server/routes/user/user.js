const express = require('express');
const Router = express();
const Controller = require('./controller')

/**
 * 회원가입 등록
 */
Router.post('/signup', Controller.postSignup)

/**
 * 회원정보 조회
 */
Router.get('/member', Controller.getMember)

/**
 * 회원정보 수정
 */
Router.post('/member', Controller.editMember)

/**
 * 로그인 처리
 */
Router.post('/login', Controller.postLogin)

exports.module = Router;