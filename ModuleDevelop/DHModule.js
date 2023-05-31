var DHModule = {};
DHModule.DB = require('./DB/DB_Module');


var db_data = null;

DHModule.init = () => {
	db_data = DB.connect();

}




module.exports = DHModule;