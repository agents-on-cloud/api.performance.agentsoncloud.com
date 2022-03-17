const validRoutes = require('../../../metrics.json');

let APIMessage = "Available review routes are: \n\n";
Object.keys(validRoutes).forEach((model, idx) => {
    APIMessage += `${idx + 1}- ${model} \n`;
});

const getModel = (req, res, next) => {

    req.model = validRoutes[req.params.model] && req.params.model;

    req.model ? next() : res.status(300).send(APIMessage);
};

module.exports = getModel;