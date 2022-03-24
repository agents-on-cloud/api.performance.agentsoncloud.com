const db = require("../models");
const metrics = require("../../metrics.json")
const moment = require("moment");
const Op = db.Sequelize.Op

const getRecords = async (model, { limit, offset, daysBefore, orderBy, orderDesc }) => {
    // TODO: move ordering to its own UTIL 
    const orderByArray = (orderBy && orderBy.split(",")) || [];
    const orderDescArray = (orderDesc && orderDesc.split(",")) || [];

    return await db.reviews.findAndCountAll({
        where: {
            ...(model && { reviewedType: model }),

            ...(daysBefore && {
                createdAt: {
                    [Op.gte]: moment().subtract(daysBefore, 'days').toDate()
                }
            })
        },
        limit,
        offset,
        ...(orderByArray.length ? { order: [...orderByArray.map((order, idx) => [order, `${orderDescArray[idx] === "true" ? "DESC" : "ASC"}`])] } : { order: [["score", "ASC"]] })
    });
}

const getGroupedRecords = async (model, { limit = null, offset = null, daysBefore, orderBy, orderDesc }) => {
    let validMetrics = getValidMetrics(model);
    const orderByArray = (orderBy && orderBy.split(",")) || [];
    const orderDescArray = (orderDesc && orderDesc.split(",")) || [];
    console.log((orderByArray.length ? { order: [...orderByArray.map((order, idx) => [order, `${orderDescArray[idx] === "true" ? "DESC" : "ASC"}`])] } : { order: [[db.sequelize.fn('AVG', db.sequelize.col('score')), "ASC"]] })
    );
    const attributes = [
        "reviewedName",
        [db.sequelize.fn('COUNT', db.sequelize.col('reviewedId')), 'number_of_reviews'],
        [db.sequelize.fn('AVG', db.sequelize.col('score')), 'score'],
        ...validMetrics.map(metric => [db.sequelize.fn('AVG', db.sequelize.col(`${metric.name}`)), `${metric.name}`])
    ];

    if (model === "providers") attributes.push("providerType");
    return await db.reviews.findAndCountAll({
        where: {
            reviewedType: model,
            ...(daysBefore && {
                createdAt: {
                    [Op.gte]: moment().subtract(daysBefore, 'days').toDate()
                }
            })
        },
        limit,
        offset,
        attributes,
        group: 'reviewedId',
        ...(orderByArray.length ? { order: [...orderByArray.map((order, idx) => [db.sequelize.fn('AVG', db.sequelize.col(`${order}`)), `${orderDescArray[idx] === "true" ? "DESC" : "ASC"}`])] } : { order: [[db.sequelize.fn('AVG', db.sequelize.col('score')), "ASC"]] })
    });
}

const getValidMetrics = (model) => {
    if (model !== "providers") {
        return metrics[model];
    } else if (model === "providers") {
        return [...metrics[model]["operational"], ...metrics[model]["managerial"], ...metrics[model]["front-facing"]];
    }
}

const createRecord = async (model, body) => {
    return await db[model].create(body);
};

module.exports = { getRecords, createRecord, getGroupedRecords }
