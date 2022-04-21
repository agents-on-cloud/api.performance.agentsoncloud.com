const express = require('express');
const router = express.Router();

const { getParamType, getModel } = require('../middlewares/dynamicHandler');
const { getRecords, postRecord, putRecord } = require('./controller');

router.param("parameter", getParamType); 
router.param("model", getModel); 

router.get('/:model/:parameter?', getRecords);
router.post('/:model', postRecord);
router.put('/:model/:id', putRecord);

module.exports = router;
