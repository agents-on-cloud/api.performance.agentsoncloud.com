const { REVIEWED_TYPES_ARRAY, PARAM_TYPES_MAP } = require("../../Utils/CONSTANTS");
const { models } = require('../../models');

let reviewAPIMessage = "Available review routes are: \n\n";
Object.keys(REVIEWED_TYPES_ARRAY).forEach((model, idx) => {
    reviewAPIMessage += `${idx + 1} - ${model} \n`;
});

let modelAPIMessage = "Available model routes are: \n\n";
Object.keys(models).forEach((model, idx) => {
    modelAPIMessage += `${idx + 1} - ${model} \n`;
});

// returns req.reviewedType string
const getReviewedType = (req, res, next) => {
    req.reviewedType = REVIEWED_TYPES_ARRAY.includes(req.params.reviewedType) && req.params.reviewedType;
    req.reviewedType ? next() : res.status(300).send(reviewAPIMessage);
};

// returns req.model sequelize object
const getModel = (req, res, next) => {
    req.model = models[req.params.model];
    req.model ? next() : res.status(300).send(modelAPIMessage);
};

const getParamType = (req, res, next) => {
    req.parameter = req.params.parameter
    req.paramType = PARAM_TYPES_MAP[req.params.model] || PARAM_TYPES_MAP["others"];

    next();
}

module.exports = { getReviewedType, getModel, getParamType };