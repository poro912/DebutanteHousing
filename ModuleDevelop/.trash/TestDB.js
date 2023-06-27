import mysql from 'mysql2/promise.js';


// 모듈 정의
var database = {};



/*
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'test',
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0
});



pool.query("SELECT field FROM atable", function (err, rows, fields) {
	// Connection is automatically released when query resolves
})
*/


const test = async () => {
	try {
		// db connection
		let connection = await mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "A12345678!",
			database: "db_personal",
		});

		var id = "id1";
		var pw = "pw1";
		// Select all rows from example table
		let [rows, fields] = await connection.query(`SELECT * FROM user WHERE id = "${id}" and pw = "${pw}";`);
		console.log(rows);

	} catch (error) {
		console.log(error);
	}
};
database.test = test;



// module.exports = database;
export default database;
