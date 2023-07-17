const express = require('express');
const Router = express();
const Controller = require('./controller')

Router.use('*', Controller.wrong);

exports.module = Router;