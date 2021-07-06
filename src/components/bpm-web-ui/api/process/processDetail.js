import request from '@/components/bpm-web-ui/utils/request'
import apiDownLoad from '@/components/bpm-web-ui/utils/download'

export function getProcessDetailListPage(query) {
  return request({
    url: '/lowCode/processDetail/getListPage',
    method: 'post',
    data: query
  })
}

export function getProcessDetailList(query) {
  return request({
    url: '/lowCode/processDetail/getList',
    method: 'post',
    data: query
  })
}

export function saveProcessDetail(form) {
  return request({
    url: '/lowCode/processDetail/insert',
    method: 'post',
    data: form
  })
}

export function updateProcessDetail(form) {
  return request({
    url: '/lowCode/processDetail/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/processDetail/deleteById',
    method: 'post',
    data: { 'processDetailId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/processDetail/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/processDetail/getById',
    method: 'post',
    data: { 'processDetailId': id }
  })
}

export function publish(data) {
  return request({
    url: '/lowCode/processDetail/publish',
    method: 'post',
    data
  })
}

export function updateDefaultVersion(processId, processDetailId) {
  return request({
    url: '/lowCode/processDetail/updateDefaultVersion/' + processId + '/' + processDetailId,
    method: 'post'
  })
}

export function getProcessDetailById(processDetailId) {
  return Promise.resolve({"code":200,"data":{"applyDueDate":null,"applyTitleRule":"","autoCompleteFirstNode":1,"createTime":"2021-06-16 18:14:12","definitionId":"pig-process-linbin_001:2:0831ec18-ce8a-11eb-ac08-0242295cfd4d","mainVersion":1,"operatorId":2,"operatorName":"管理员","processDetailId":193,"processId":139,"processXml":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:flowable=\"http://flowable.org/bpmn\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:ns0=\"undefined\" targetNamespace=\"http://www.flowable.org/processdef\">\n  <process id=\"pig-process-linbin_001\" name=\"测试流程与表单\" isExecutable=\"true\">\n    <documentation>测试流程与表单</documentation>\n    <startEvent id=\"StartEvent_1\" name=\"开始节点\">\n      <outgoing>SequenceFlow_0d28r1z</outgoing>\n    </startEvent>\n    <userTask id=\"UserTask_0bzixg4\" name=\"用户任务_1\">\n      <extensionElements>\n        <flowable:customProperties userIdList=\"\" userNameList=\"\" assigneeField=\"bpm_UserTask_0bzixg4_assignee_field\" handlerStrategy=\"skip\" roleGroupCode=\"pig:roleGroup:testCompany:techDirector\" roleCode=\"pig:administrastor\" findUserType=\"2\" relationNodeId=\"\" actionList=\"pass,reject\" taskType=\"approve\" sequential=\"parallel\" proportion=\"100\" formName=\"\" selectFormKey=\"\" selectPath=\"0\" />\n      </extensionElements>\n      <incoming>SequenceFlow_0d28r1z</incoming>\n      <incoming>SequenceFlow_1vs9kju</incoming>\n      <outgoing>SequenceFlow_1a7lvsz</outgoing>\n    </userTask>\n    <sequenceFlow id=\"SequenceFlow_0d28r1z\" sourceRef=\"StartEvent_1\" targetRef=\"UserTask_0bzixg4\" />\n    <exclusiveGateway id=\"ExclusiveGateway_0us36pl\" name=\"条件_1\">\n      <incoming>SequenceFlow_1a7lvsz</incoming>\n      <outgoing>SequenceFlow_0tfzxsh</outgoing>\n      <outgoing>SequenceFlow_1u3mtmg</outgoing>\n    </exclusiveGateway>\n    <sequenceFlow id=\"SequenceFlow_1a7lvsz\" sourceRef=\"UserTask_0bzixg4\" targetRef=\"ExclusiveGateway_0us36pl\" />\n    <userTask id=\"UserTask_1mc0cii\" name=\"用户任务_2\">\n      <extensionElements>\n        <flowable:customProperties userIdList=\"\" userNameList=\"\" assigneeField=\"bpm_UserTask_1mc0cii_assignee_field\" handlerStrategy=\"skip\" roleGroupCode=\"pig:roleGroup:testCompany:techDirector\" roleCode=\"pig:administrastor\" findUserType=\"1\" relationNodeId=\"\" actionList=\"pass,reject\" taskType=\"approve\" sequential=\"parallel\" proportion=\"100\" formName=\"\" selectFormKey=\"\" selectPath=\"0\" />\n      </extensionElements>\n      <incoming>SequenceFlow_0tfzxsh</incoming>\n      <outgoing>SequenceFlow_1vs9kju</outgoing>\n      <outgoing>SequenceFlow_1507blu</outgoing>\n    </userTask>\n    <sequenceFlow id=\"SequenceFlow_0tfzxsh\" sourceRef=\"ExclusiveGateway_0us36pl\" targetRef=\"UserTask_1mc0cii\" />\n    <userTask id=\"UserTask_126h67q\" name=\"用户任务_3\">\n      <extensionElements>\n        <flowable:customProperties userIdList=\"\" userNameList=\"\" assigneeField=\"bpm_UserTask_126h67q_assignee_field\" handlerStrategy=\"skip\" roleGroupCode=\"pig:roleGroup:testCompany:techDirector\" roleCode=\"\" findUserType=\"1\" relationNodeId=\"\" actionList=\"pass,reject\" taskType=\"approve\" sequential=\"parallel\" proportion=\"100\" formName=\"\" selectFormKey=\"\" selectPath=\"0\" />\n      </extensionElements>\n      <incoming>SequenceFlow_1u3mtmg</incoming>\n      <outgoing>SequenceFlow_107stuj</outgoing>\n    </userTask>\n    <sequenceFlow id=\"SequenceFlow_1u3mtmg\" sourceRef=\"ExclusiveGateway_0us36pl\" targetRef=\"UserTask_126h67q\" />\n    <sequenceFlow id=\"SequenceFlow_1vs9kju\" sourceRef=\"UserTask_1mc0cii\" targetRef=\"UserTask_0bzixg4\" />\n    <endEvent id=\"EndEvent_164cu6a\" name=\"结束节点_2\">\n      <incoming>SequenceFlow_1507blu</incoming>\n    </endEvent>\n    <sequenceFlow id=\"SequenceFlow_1507blu\" sourceRef=\"UserTask_1mc0cii\" targetRef=\"EndEvent_164cu6a\" />\n    <endEvent id=\"EndEvent_0tjxru0\" name=\"结束节点_3\">\n      <incoming>SequenceFlow_107stuj</incoming>\n    </endEvent>\n    <sequenceFlow id=\"SequenceFlow_107stuj\" sourceRef=\"UserTask_126h67q\" targetRef=\"EndEvent_0tjxru0\" />\n  </process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_pig-process-linbin_001\">\n    <bpmndi:BPMNPlane id=\"BPMNPlane_pig-process-linbin_001\" bpmnElement=\"pig-process-linbin_001\">\n      <bpmndi:BPMNShape id=\"BPMNShape_StartEvent_1\" bpmnElement=\"StartEvent_1\">\n        <omgdc:Bounds x=\"442\" y=\"162\" width=\"36\" height=\"36\" />\n        <bpmndi:BPMNLabel>\n          <omgdc:Bounds x=\"438\" y=\"205\" width=\"43\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"UserTask_0bzixg4_di\" bpmnElement=\"UserTask_0bzixg4\">\n        <omgdc:Bounds x=\"530\" y=\"140\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_0d28r1z_di\" bpmnElement=\"SequenceFlow_0d28r1z\">\n        <omgdi:waypoint x=\"478\" y=\"180\" />\n        <omgdi:waypoint x=\"530\" y=\"180\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"ExclusiveGateway_0us36pl_di\" bpmnElement=\"ExclusiveGateway_0us36pl\" isMarkerVisible=\"true\">\n        <omgdc:Bounds x=\"685\" y=\"155\" width=\"50\" height=\"50\" />\n        <bpmndi:BPMNLabel>\n          <omgdc:Bounds x=\"745\" y=\"173\" width=\"34\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_1a7lvsz_di\" bpmnElement=\"SequenceFlow_1a7lvsz\">\n        <omgdi:waypoint x=\"630\" y=\"180\" />\n        <omgdi:waypoint x=\"685\" y=\"180\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"UserTask_1mc0cii_di\" bpmnElement=\"UserTask_1mc0cii\">\n        <omgdc:Bounds x=\"910\" y=\"-40\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_0tfzxsh_di\" bpmnElement=\"SequenceFlow_0tfzxsh\">\n        <omgdi:waypoint x=\"710\" y=\"155\" />\n        <omgdi:waypoint x=\"710\" y=\"0\" />\n        <omgdi:waypoint x=\"910\" y=\"0\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"UserTask_126h67q_di\" bpmnElement=\"UserTask_126h67q\">\n        <omgdc:Bounds x=\"790\" y=\"250\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_1u3mtmg_di\" bpmnElement=\"SequenceFlow_1u3mtmg\">\n        <omgdi:waypoint x=\"710\" y=\"205\" />\n        <omgdi:waypoint x=\"710\" y=\"290\" />\n        <omgdi:waypoint x=\"790\" y=\"290\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_1vs9kju_di\" bpmnElement=\"SequenceFlow_1vs9kju\">\n        <omgdi:waypoint x=\"960\" y=\"-40\" />\n        <omgdi:waypoint x=\"960\" y=\"-130\" />\n        <omgdi:waypoint x=\"580\" y=\"-130\" />\n        <omgdi:waypoint x=\"580\" y=\"140\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"EndEvent_164cu6a_di\" bpmnElement=\"EndEvent_164cu6a\">\n        <omgdc:Bounds x=\"1192\" y=\"-18\" width=\"36\" height=\"36\" />\n        <bpmndi:BPMNLabel>\n          <omgdc:Bounds x=\"1182\" y=\"21\" width=\"56\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_1507blu_di\" bpmnElement=\"SequenceFlow_1507blu\">\n        <omgdi:waypoint x=\"1010\" y=\"0\" />\n        <omgdi:waypoint x=\"1192\" y=\"0\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"EndEvent_0tjxru0_di\" bpmnElement=\"EndEvent_0tjxru0\">\n        <omgdc:Bounds x=\"952\" y=\"272\" width=\"36\" height=\"36\" />\n        <bpmndi:BPMNLabel>\n          <omgdc:Bounds x=\"942\" y=\"311\" width=\"56\" height=\"14\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_107stuj_di\" bpmnElement=\"SequenceFlow_107stuj\">\n        <omgdi:waypoint x=\"890\" y=\"290\" />\n        <omgdi:waypoint x=\"952\" y=\"290\" />\n      </bpmndi:BPMNEdge>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</definitions>\n","publishStatus":2,"remarks":"测试流程与表单","tenantId":"pig","updateTime":"2021-06-16 18:14:12","validState":1},"error":false,"message":"success","responseDate":"2021-06-17 15:46:07"});
  return request({
    url: '/lowCode/processDetail/getProcessDetailById/' + processDetailId,
    method: 'post'
  })
}

export function insertOrUpdate(data) {
  return request({
    url: '/lowCode/processDetail/insertOrUpdate',
    method: 'post',
    data
  })
}
