const REVIEWED_TYPES_ARRAY = [
    'facilities.room', 'facilities.equipments', 'facilities.establishment',
    'providers.front', 'providers.operational', 'providers.managerial',
    'services', 'suppliers', 'consumers'];
const PARAM_TYPES_MAP = {
    metrics: "orgId",
    reviews: "reviewedType",
    others: "id"
}
module.exports = { REVIEWED_TYPES_ARRAY, PARAM_TYPES_MAP };
