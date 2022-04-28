const { findRecords, addRecord, editRecord } = require('../../services/dynamic.js')

const getRecords = async (req, res) => {
    const { model, paramType, parameter, query } = req;
    try {
        let records = await findRecords(model, paramType, parameter, query);

        return res.status(200).send(records);
    } catch (error) {
        res.status(501).send(error.toString());
    }
};

const postRecord = async (req, res) => {
    const { model, body } = req;
    try {
        let records = await addRecord(model, body);

        return res.status(200).send(records);
    } catch (error) {
        res.status(501).send(error.toString());
    }
};

const putRecord = async (req, res) => {
    const { model, body, params: { id } } = req;
    try {
        let records = await editRecord(model, body, id);

        return res.status(200).send(records);
    } catch (error) {
        res.status(501).send(error.toString());
    }
};

module.exports = { getRecords, postRecord, putRecord }