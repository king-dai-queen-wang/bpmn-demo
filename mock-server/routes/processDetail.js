var express = require('express')
var processDetail = express.Router();

// middleware that is specific to this processDetail
processDetail.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
processDetail.post('/getProcessDetailById/:id', function (req, res) {
    return res.json({"code":200,"data":{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"createTime":"2021-06-15 16:54:11","definitionId":"","mainVersion":2,"operatorId":0,"operatorName":"","processDetailId":187,"processId":133,"processXml":"","publishStatus":1,"remarks":"","tenantId":"pig","updateTime":"2021-06-15 16:54:11","validState":1},"error":false,"message":"success","responseDate":"2021-06-15 23:02:39"})
})
// define the about route
processDetail.get('/about', function (req, res) {
    res.send('About birds')
})

module.exports = processDetail