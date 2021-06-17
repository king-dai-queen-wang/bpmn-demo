var express = require('express')
var dict = express.Router();

// middleware that is specific to this dict
dict.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
dict.post('/getDictListByDictCode/pig:dict:nodeAction', function (req, res) {
    return res.json({"code":200,"data":[{"disabled":false,"label":"草稿","value":"draft"},{"disabled":false,"label":"审批通过","value":"pass"},{"disabled":false,"label":"拒绝","value":"reject"},{"disabled":false,"label":"加签","value":"addSign"},{"disabled":false,"label":"新增临时节点","value":"addTempNode"},{"disabled":false,"label":"退回","value":"returnNode"},{"disabled":false,"label":"自由跳转","value":"returnRandomNode"},{"disabled":false,"label":"签名","value":"personSign"},{"disabled":false,"label":"会签","value":"counterSign"},{"disabled":false,"label":"抄送","value":"carbonCopy"},{"disabled":false,"label":"告知","value":"notify"},{"disabled":false,"label":"直送","value":"directSend"}],"error":false,"message":"success","responseDate":"2021-06-16 15:25:58"})
})
// define the about route
dict.post('/getRoleDictByTenantId/pig', function (req, res) {
    res.json({"code":200,"data":[{"disabled":false,"label":"【测试集团】管理员","value":"pig:administrastor"},{"disabled":false,"label":"总公司技术部负责人","value":"pig:role:techDirector"},{"disabled":false,"label":"总公司技术部经理","value":"pig:role:techManager"},{"disabled":false,"label":"总公司技术部职员","value":"pig:role:techStaff"},{"disabled":false,"label":"董事长","value":"pig:role:hairman"},{"disabled":false,"label":"总经理","value":"pig:role:generalManager"},{"disabled":false,"label":"总公司财务部负责人","value":"pig:role:financeDirector"},{"disabled":false,"label":"总公司财务部经理","value":"pig:role:financeManager"},{"disabled":false,"label":"总公司财务部职员","value":"pig:role:financeStaff"},{"disabled":false,"label":"广分总经理","value":"pig:role:gdBranchCompany:generalManager"},{"disabled":false,"label":"广分技术部负责人","value":"pig:role:gdBranchCompany:techDirector"},{"disabled":false,"label":"广分技术部职员","value":"pig:role:gdBranchCompany:techStaff"},{"disabled":false,"label":"广分财务部负责人","value":"pig:role:gdBranchCompany:financeDirector"},{"disabled":false,"label":"广分财务部职员","value":"pig:role:gdBranchCompany:financeStaff"}],"error":false,"message":"success","responseDate":"2021-06-16 15:25:58"})
});

dict.post('/getRoleGroupDictByTenantId/:pig', function (req,res) {
    res.json({"code":200,"data":[{"disabled":false,"label":"总公司技术部负责人","value":"pig:roleGroup:testCompany:techDirector"},{"disabled":false,"label":"总公司技术部经理","value":"pig:roleGroup:testCompany:techManager"},{"disabled":false,"label":"总公司技术部职员","value":"pig:roleGroup:testCompany:techStaff"},{"disabled":false,"label":"董事长","value":"pig:roleGroup:testCompany:hairman"},{"disabled":false,"label":"总经理","value":"pig:roleGroup:testCompany:generalManager"},{"disabled":false,"label":"总公司财务部负责人","value":"pig:roleGroup:testCompany:financeDirector"},{"disabled":false,"label":"总公司财务部经理","value":"pig:roleGroup:testCompany:financeManager"},{"disabled":false,"label":"总公司财务部职员","value":"pig:roleGroup:testCompany:financeStaff"},{"disabled":false,"label":"总公司职员","value":"pig:roleGroup:testCompany:staff"},{"disabled":false,"label":"总公司部门负责人","value":"pig:roleGroup:testCompany:director"},{"disabled":false,"label":"广分技术部负责人","value":"pig:roleGroup:gdBranchCompany:techDirector"},{"disabled":false,"label":"广分技术部职员","value":"pig:roleGroup:gdBranchCompany:techStaff"},{"disabled":false,"label":"广分总经理","value":"pig:roleGroup:gdBranchCompany:generalManager"},{"disabled":false,"label":"广分财务部负责人","value":"pig:roleGroup:gdBranchCompany:financeDirector"},{"disabled":false,"label":"广分财务部职员","value":"pig:roleGroup:gdBranchCompany:financeStaff"},{"disabled":false,"label":"分公司职员","value":"pig:roleGroup:gdBranchCompany:staff"},{"disabled":false,"label":"分公司部门负责人","value":"pig:roleGroup:gdBranchCompany:director"}],"error":false,"message":"success","responseDate":"2021-06-16 15:25:58"})
})

dict.post('/getRoleDictByTenantId/:id', function (req,res) {
    res.json({"code":200,"data":[{"disabled":false,"label":"【测试集团】管理员","value":"pig:administrastor"},{"disabled":false,"label":"总公司技术部负责人","value":"pig:role:techDirector"},{"disabled":false,"label":"总公司技术部经理","value":"pig:role:techManager"},{"disabled":false,"label":"总公司技术部职员","value":"pig:role:techStaff"},{"disabled":false,"label":"董事长","value":"pig:role:hairman"},{"disabled":false,"label":"总经理","value":"pig:role:generalManager"},{"disabled":false,"label":"总公司财务部负责人","value":"pig:role:financeDirector"},{"disabled":false,"label":"总公司财务部经理","value":"pig:role:financeManager"},{"disabled":false,"label":"总公司财务部职员","value":"pig:role:financeStaff"},{"disabled":false,"label":"广分总经理","value":"pig:role:gdBranchCompany:generalManager"},{"disabled":false,"label":"广分技术部负责人","value":"pig:role:gdBranchCompany:techDirector"},{"disabled":false,"label":"广分技术部职员","value":"pig:role:gdBranchCompany:techStaff"},{"disabled":false,"label":"广分财务部负责人","value":"pig:role:gdBranchCompany:financeDirector"},{"disabled":false,"label":"广分财务部职员","value":"pig:role:gdBranchCompany:financeStaff"}],"error":false,"message":"success","responseDate":"2021-06-17 15:46:56"})
});

dict.post('/getDictListByDictCode/organTree', function (req,res) {
    res.json({"code":200,"data":[],"error":false,"message":"success","responseDate":"2021-06-17 15:46:00"});
})


module.exports = dict