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
			form = syste.form.init(from);
			form = system.form.addResult(form,false, "please follow this form");
			return res.json(form);m
		}

		Model.joinIn(res,form,(res, result)=>{
			return res.json(result);
		});
		
		//Model.joinIn(data.id,data.pw,data.name,data.nick,data.email,data.phone,()=>{});
        Model.joinIn(form,id, form.pw,'test','poro','','',(result)=>{
            // 결과를 제이슨 형태로 반환한다.
            return res.json(result);
        });
        //return res.json({'name':'test'});
    },
    getMember : (req, res) => {
        // 회원 정보 조회 처리 코드
    },
    editMember : (req, res) => {
        // 회원 정보 수정 처리 코드
    },
    postLogin : (req, res) => {
        // 로그인 처리 코드
        let ret = true;
        let result = {
            'success' : Boolean,
            'id' : String,
            'nick' : String,
        }
        result.success = false;
        if (true == ret){
            result.success = true;
            result.id = "test"
            result.nick = "test nick";
        }

        return res.json(result);
        /*
        Model.login(req.id, req.pw, ()=>{
            let ret = false;
            let result = {
                'success' : Boolean,
                'id' : String,
                'nick' : String,
            }
            result.success = false;
            if (true == ret){
                result.success = true;
                result.id = "test"
                result.nick = "test nick";
            }
    
            return res.json(result);
        })
        */
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

module.exports = Router;