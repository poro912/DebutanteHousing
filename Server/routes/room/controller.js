const express = require('express');
const Router = express();
Router.use(express.json());

const Model = require('../../models/room').module;
const system = require('../../utils/DHM_system').module;

// const Model = require('../../models/대충 쿼리들어있는 모델')

const Controller = {
	example : {
		items :[
			{
				code : 0,
				pos : ["x","y","z"],
				rot : ["x","y","z"]
			}
		]
	},
    getInfo : (req, res) => {
		// 방 정보 획득 코드
        system.debug.print('getInfo');

        let data = req.body;
        let form = {
            code : data.code,
        };

        system.debug.print('code : ', data.code);

		// 폼이 전부 채워져 있지 않다면
		if(!system.form.checkFill(form))
		{
			// 모두 초기화 반환
			form = system.form.init(form);
			form = system.form.addResult(form,false, "please follow this form");
			return res.json(form);
		}

		Model.getRoomInfo(res,form,(res, result)=>{
			return res.json(result);
		});
	},
    
	putReplaceItem : (req, res) => {
		// 아이템 위치 공간 전부 수정
        system.debug.print('postItemReplace');

        let data = req.body;
        let form = {
            code : data.code,
			items : data.items,
        };

        // system.debug.print('id : ', data.code);

		// 폼이 전부 채워져 있지 않다면
		if(!system.form.checkFill(form))
		{
			// 모두 초기화 반환
			form = system.form.init(form);
			form = system.form.addResult(form,false, "please follow this form");
			form["items"] = example.items;
			return res.json(form);
		}

		Model.replaceItems(res,form,(res, result)=>{
			return res.json(result);
		});
	},

	postPlaceItem : (req,res) => {
		// 방 아이템 추가
        system.debug.print('getPlaceItem');

        let data = req.body;
        let form = {
            code : data.code,
			items : data.items
        };

        // system.debug.print('code : ', data.code);

		// 폼이 전부 채워져 있지 않다면
		if(!system.form.checkFill(form))
		{
			// 모두 초기화 반환
			form = system.form.init(form);
			form = system.form.addResult(form,false, "please follow this form");
			form["items"] = example.items;
			return res.json(form);
		}

		Model.placeItems(res,form,(res, result)=>{
			return res.json(result);
		});
	},

	postDeleteItem : (req, res) => {
		// 방 아이템 삭제
        system.debug.print('deleteItem');

        let data = req.body;
        let form = {
            code : data.code,
			items : data.items
        };

        // system.debug.print('code : ', data.code);

		// 폼이 전부 채워져 있지 않다면
		if(!system.form.checkFill(form))
		{
			// 모두 초기화 반환
			form = system.form.init(form);
			form = system.form.addResult(form,false, "please follow this form");
			form["items"] = Controller.example.items;
			return res.json(form);
		}

		Model.deleteItems(res,form,(res, result)=>{
			return res.json(result);
		});
	},
}

/**
 * 방 정보 획득
 */
Router.post('/', Controller.getInfo)

/**
 * 방 아이템 위치 변경
 */
Router.put('/item', Controller.putReplaceItem)

/**
 * 방 아이템 등록
 */
Router.post('/item', Controller.postPlaceItem)

/**
 * 방 아이템 삭제 
 */
Router.post('/item/delete', Controller.postDeleteItem)

module.exports = Router;