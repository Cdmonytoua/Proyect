const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');
const pool = mysql.createPool(database); 
pool.getConnection((err, conn) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error("CONNECTION LOST");
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error("MANY CONNECTIONS");
        }
        if(err.code == 'ECONNREFUSED'){
            console.error("CONN REFUSED");
        }
    }else if(conn){
        conn.release();
        console.log('Connected'); 
    }
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;