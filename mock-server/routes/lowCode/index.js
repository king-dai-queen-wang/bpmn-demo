const express = require('express');
var router  = express.Router();
// const processDetail = require('./processDetail');
router.use('/process', require('./process'));
// lowCodeRouter.use('/processDetail', processDetail);

module.export = router ;