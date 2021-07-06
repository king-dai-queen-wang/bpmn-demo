import request from '@/components/bpm-web-ui/utils/request'
import apiDownLoad from '@/components/bpm-web-ui/utils/download'

export function getProcessListPage(query) {
  return Promise.resolve({"code":200,"data":{"endRow":10,"hasNextPage":true,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":false,"list":[{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"pig:company:testCompany","companyId":1,"createTime":"2021-06-15 17:31:36","definitionId":"","operatorId":null,"operatorName":"","processAbbr":"kljljlk","processDetailId":188,"processId":134,"processKey":"pig-process-winner","processMenuId":null,"processName":"测试流程","processStatus":1,"processType":1,"processXml":"","remarks":"","sort":1,"tenantId":"pig","updateTime":"2021-06-15 19:24:13","validState":1},{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"pig:company:bondCompany","companyId":2,"createTime":"2021-06-15 16:54:11","definitionId":"","operatorId":null,"operatorName":"","processAbbr":"DSAA","processDetailId":187,"processId":133,"processKey":"pig-process-DSA","processMenuId":null,"processName":"DSA","processStatus":1,"processType":1,"processXml":"","remarks":"","sort":1,"tenantId":"pig","updateTime":"2021-06-15 16:54:11","validState":1},{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"","companyId":null,"createTime":"2021-06-13 16:30:14","definitionId":"","operatorId":null,"operatorName":"","processAbbr":"xxxx","processDetailId":185,"processId":130,"processKey":"pig-process-xxx","processMenuId":null,"processName":"xxx","processStatus":1,"processType":1,"processXml":"","remarks":"","sort":1,"tenantId":"pig","updateTime":"2021-06-13 16:30:13","validState":1},{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"pig:company:testCompany","companyId":1,"createTime":"2021-06-12 11:11:26","definitionId":"pig-process-dww:1:524284fd-cb2d-11eb-aa2e-0242295cfd4d","operatorId":null,"operatorName":"","processAbbr":"dww","processDetailId":184,"processId":129,"processKey":"pig-process-dww","processMenuId":null,"processName":"dww","processStatus":2,"processType":1,"processXml":"","remarks":"","sort":1,"tenantId":"pig","updateTime":"2021-06-13 16:30:04","validState":1},{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"pig:company:testCompany","companyId":1,"createTime":"2021-06-11 09:38:51","definitionId":"","operatorId":null,"operatorName":"","processAbbr":"cesi","processDetailId":183,"processId":126,"processKey":"pig-process-测试","processMenuId":null,"processName":"测试","processStatus":1,"processType":1,"processXml":"","remarks":"测试","sort":1,"tenantId":"pig","updateTime":"2021-06-11 18:39:59","validState":1},{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"pig:company:testCompany","companyId":1,"createTime":"2021-06-10 23:17:01","definitionId":"","operatorId":null,"operatorName":"","processAbbr":"weee","processDetailId":182,"processId":125,"processKey":"pig-process-eeeee","processMenuId":null,"processName":"eeee","processStatus":1,"processType":1,"processXml":"","remarks":"eee","sort":1,"tenantId":"pig","updateTime":"2021-06-10 23:17:01","validState":1},{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"pig:company:gdBranchCompany","companyId":4,"createTime":"2021-06-10 10:10:44","definitionId":"pig-process-123qweasd:1:b5fc91d6-c9c9-11eb-aa2e-0242295cfd4d","operatorId":null,"operatorName":"","processAbbr":"myprocess","processDetailId":180,"processId":122,"processKey":"pig-process-123qweasd","processMenuId":null,"processName":"我的流程","processStatus":2,"processType":1,"processXml":"","remarks":"","sort":1,"tenantId":"pig","updateTime":"2021-06-13 16:33:05","validState":1},{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"","companyId":null,"createTime":"2021-06-09 18:12:43","definitionId":"","operatorId":null,"operatorName":"","processAbbr":"xm","processDetailId":179,"processId":121,"processKey":"pig-process-项目test","processMenuId":null,"processName":"项目","processStatus":1,"processType":1,"processXml":"","remarks":"","sort":1,"tenantId":"pig","updateTime":"2021-06-09 18:12:42","validState":1},{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"pig:company:testCompany","companyId":1,"createTime":"2021-06-09 14:00:16","definitionId":"","operatorId":null,"operatorName":"","processAbbr":"lcjc","processDetailId":178,"processId":120,"processKey":"pig-process-lckeyd","processMenuId":null,"processName":"lcmc","processStatus":1,"processType":1,"processXml":"","remarks":"流程流程流程流程流程","sort":1,"tenantId":"pig","updateTime":"2021-06-09 14:04:40","validState":1},{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"companyCode":"pig:company:testCompany","companyId":1,"createTime":"2021-06-09 10:23:22","definitionId":"pig-process-000:1:24975ade-c8ca-11eb-aa2e-0242295cfd4d","operatorId":null,"operatorName":"","processAbbr":"qqq","processDetailId":175,"processId":117,"processKey":"pig-process-000","processMenuId":null,"processName":"000","processStatus":2,"processType":1,"processXml":"","remarks":"","sort":1,"tenantId":"pig","updateTime":"2021-06-09 10:31:19","validState":1}],"navigateFirstPage":1,"navigateLastPage":8,"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8],"nextPage":2,"pageNum":1,"pageSize":10,"pages":9,"prePage":0,"size":10,"startRow":1,"total":89},"error":false,"message":"success","responseDate":"2021-06-15 22:59:28"})
  return request({
    url: '/lowCode/process/getListPage',
    method: 'post',
    data: query
  })
}

export function getProcessList(query) {
  return request({
    url: '/lowCode/process/getList',
    method: 'post',
    data: query
  })
}

export function saveProcess(form) {
  return request({
    url: '/lowCode/process/insert',
    method: 'post',
    data: form
  })
}

export function updateProcess(form) {
  return request({
    url: '/lowCode/process/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/process/deleteById',
    method: 'post',
    data: { 'processId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/process/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/process/getById',
    method: 'post',
    data: { 'processId': id }
  })
}

export function getProcessByKey(data) {
  return request({
    url: '/lowCode/process/getProcessByKey/' + data,
    method: 'post'
  })
}

export function initFormData(data) {
  return request({
    url: '/lowCode/process/getInitStartFormData/' + data,
    method: 'post'
  })
}
