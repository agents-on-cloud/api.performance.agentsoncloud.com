const validRoutes = require('../../metrics.json');

const VALID_REVIEW_ROUTES = `(${Object.keys(validRoutes).join("|")})`;

module.exports = VALID_REVIEW_ROUTES;
