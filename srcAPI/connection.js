const mysql = require("mysql2/promise");
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '200204',
    database: 'tetrisRank',
    port: 3307
});
module.exports = connection;
