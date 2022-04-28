const REVIEWED_TYPES_ARRAY = [
    'facilities', 'facilities.room', 'facilities.equipment', 'facilities.establishment',
    'providers', 'providers.front', 'providers.operational', 'providers.managerial',
    'services', 'suppliers', 'consumers', "reviews"];
const PARAM_TYPES_MAP = {
    metrics: { name: "orgId", op: "eq" },
    reviews: { name: "reviewedType", op: "substring" },
    others: { name: "id", op: "eq" }
}
module.exports = { REVIEWED_TYPES_ARRAY, PARAM_TYPES_MAP };
