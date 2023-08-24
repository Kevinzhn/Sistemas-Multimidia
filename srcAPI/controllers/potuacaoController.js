const pontuacaoModel = require('../models/pontuacaoModel')
const getAll = async (_req, res) => {
    const pontuacao = await pontuacaoModel.getRank();
    return res.status(200).json(pontuacao);
};
const addRecord = async (req, res) => {
    const criarRecord = await pontuacaoModel.addRecord(req.body);
    return res.status(201).json(criarRecord);
};
module.exports = {
    getAll,
    addRecord
};
