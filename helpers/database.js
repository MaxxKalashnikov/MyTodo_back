require('dotenv').config()
const { Pool } = require("pg");


const query = async(sql, values = []) => {//sql - for sql quering, values array - for handling more than one value from db
    return new Promise(async(resolve, reject) =>{
        try{
            const pool = openDB();
            const result = await pool.query(sql, values);
            resolve(result);//if success, returns resolved data 
        }catch(error){
            reject(error.message)
        }
    })
}
//for handling db connection
const openDB = () =>{
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: process.env.SSL
    })
    return pool;
}

module.exports = {
    query
}