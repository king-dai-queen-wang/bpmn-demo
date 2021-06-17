var express = require('express')
var company = express.Router();

company.post('/getCompanyIdAndNameDictList', function (req,res) {
    res.json({"code":200,"data":[{"disabled":false,"label":"测试集团","value":1},{"disabled":false,"label":"测试证券投资有限公司","value":2},{"disabled":false,"label":"测试银行有限公司","value":3},{"disabled":false,"label":"测试集团广东分公司","value":4}],"error":false,"message":"success","responseDate":"2021-06-17 15:52:58"});
})


module.exports = company