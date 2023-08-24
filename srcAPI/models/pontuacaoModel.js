const connection = require('../connection')

const getRank = async () => {
    const [pontuacao] = await connection.execute('SELECT * FROM pontuacao ORDER BY ponto DESC LIMIT 10');
    return pontuacao;
};
const addRecord = async (record) => {
    const data = new Date().toISOString().slice(0, 10);
    const {nome, ponto, linha, nivel} = record;
    const query = 'INSERT INTO pontuacao (nome, ponto, linha, nivel, data) value (? , ? , ?, ?, ?)';
    const [criarRecord] = await connection.execute(query, [nome, ponto, linha, nivel, data]);
    return {id : criarRecord.insertId};
}
module.exports = {
    getRank,
    addRecord
};

