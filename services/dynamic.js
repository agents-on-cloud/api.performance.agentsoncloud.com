const moment = require("moment");
const { Sequelize: { Op } } = require("../models");
const { defaultSort } = require("../Utils/helpers");

const findRecords = async (model, paramType, parameter, { id, reviewedId, limit, offset, daysBefore, orderBy, orderDesc }) => {
    // TODO: move ordering to its own UTIL 
    const orderByArray = (orderBy && orderBy.split(",")) || [];
    const orderDescArray = (orderDesc && orderDesc.split(",")) || [];
    return await model.findAndCountAll({
        where: {
            ...(parameter && { [paramType.name]: { [Op[paramType.op]]: parameter } }),
            ...(id && { id }),
            ...(reviewedId && { reviewedId }),
            ...(daysBefore && {
                createdAt: {
                    [Op.gte]: moment().subtract(daysBefore, 'days').toDate()
                }
            })
        },
        limit,
        offset,
        ...(orderByArray.length ? { order: [...orderByArray.map((order, idx) => [order, `${orderDescArray[idx] === "true" ? "DESC" : "ASC"}`])] } : defaultSort(model))
    });
}

const addRecord = async (model, body) => {
    return await model.create(body);
}

const editRecord = async (model, body, id) => {
    return await model.create(body, { where: { id } });
}

module.exports = { findRecords, addRecord, editRecord }