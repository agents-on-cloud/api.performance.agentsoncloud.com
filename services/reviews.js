const db = require("../models");

const getRecords = async (model, id) => {
    console.log(model, db[model], id);
    if (!model) return await db.reviews.findAll()
    if (!id) return await db.reviews.findAll({
        where: {
            reviewedType: model
        }
    });
    if (id) return await db.reviews.findOne({
        where: {
            reviewedType: model,
            reviewedId: id
        }
    });
}

const createRecord = async (model, body) => {
    return await db[model].create(body);
};

module.exports = { getRecords, createRecord }
