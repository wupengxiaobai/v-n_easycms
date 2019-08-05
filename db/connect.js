const mysql = require('mysql');
const config = require('./config')
//	创建连接
const connection = mysql.createConnection(config);

//	连接数据库
connection.connect();

//  数据库操作
connection.query('SQL语句', function(error, results, fields){
    //	results 成功结果
    if(error) return `error to connection ${error}`
});

module.exports = connection

//	关闭数据库 
// connection.end();