const express = require('express');
const Router = express();
Router.use(express.json());

const Model = require('../../models/user').module;
const system = require('../../utils/DHM_system').module;


const Controller = {
    postSignup : (req, res) => {
        // 회원가입 등록 처리 코드
        system.debug.print('postSignup');

        let data = req.body;
        let form = {
            id : data.id,
            pw : data.pw,
            name : data.name,
            nick : data.nick,
            email : data.email,
            phone : data.phone,
        };

        system.debug.print('id : ', data.id);
        system.debug.print('pw : ', data.pw);

		// 폼이 전부 채워져 있지 않다면
		if(!system.form.checkFill(form))
		{
			// 모두 초기화 반환
			form = system.form.init(form);
			form = system.form.addResult(form,false, "please follow this form");
			return res.json(form);
		}

		Model.joinIn(res,form,(res, result)=>{
			return res.json(result);
		});
    },
    postLogin : (req, res) => {
        // 로그인 처리 코드
        let data = req.body;
        let form = {
            id : data.id,
            pw : data.pw,
        };

        // 폼이 전부 채워져 있지 않다면
		if(!system.form.checkFill(form))
		{
			// 모두 초기화 반환
			form = system.form.init(form);
			form = system.form.addResult(form,false, "please follow this form");
			return res.json(form);
		}

		Model.login(res,form,(res, result)=>{
			return res.json(result);
		});
    },
    postMember : (req, res) => {
        // 회원 정보 조회 처리 코드
		// 1인 조회, 다중조회(페이지)
        let data = req.body;
        let form = {
			usercode : data.usercode,
			page : data.page,
			count : data.count,
        };
		let result = {};

		// 폼이 전부 채워져 있지 않다면
		if(!system.form.checkFill(form))
		{
			// 모두 초기화 반환
			form = system.form.init(form);
			form = system.form.addResult(form,false, "please follow this form");
			return res.json(form);
		}

		Model.getUser(res,form,(res, result)=>{
			return res.json(result);
		});
    },
    editMember : (req, res) => {
        // 회원 정보 수정 처리 코드
        system.debug.print('');

        let data = req.body;
        let form = {
        };
		let result = {};

		// 폼이 전부 채워져 있지 않다면
		if(!system.form.checkFill(form))
		{
			// 모두 초기화 반환
			form = system.form.init(form);
			form = system.form.addResult(form,false, "please follow this form");
			return res.json(form);
		}

		Model.function(res,form,(res, result)=>{
			return res.json(result);
		});
    },
	getMemberByWallet : (req, res) => {
		system.debug.print('');

        let data = req.body;
        let form = {
			wallet : req.params[0]
        };
		let result = {};

		// 폼이 전부 채워져 있지 않다면
		if(req.params[0] === undefined)
		{
			// 모두 초기화 반환
			form = system.form.addResult(form,false, "please pass me url parameter");
			return res.json(form);
		}
		Model.getUserByWallet(res,form,(res, result)=>{
			return res.json(result);
		});
	}
}

/**
 * 회원가입 등록
 */
Router.post('/signup', Controller.postSignup)

/**
 * 회원정보 조회
 */
Router.post('/member', Controller.postMember)

// 추후 구현하기 기존의 데이터에 담아서 요청하는 방법을 url에 담아서 보내는 방법으로 변환
// Router.post('/member/*', Controller.getMemberById)

/**
 * 지갑정보를 통해 유저정보 획득
 */
Router.post('/member/wallet/*', Controller.getMemberByWallet)
// req.params[0]


/**
 * 회원정보 수정
 */
// put
Router.post('/member', Controller.editMember)

/**
 * 로그인 처리
 */
Router.post('/login', Controller.postLogin)

module.exports = Router;