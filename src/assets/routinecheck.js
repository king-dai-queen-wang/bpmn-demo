export const xml  = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="true" process_namespace="" process_id="Process_1">
    <bpmn2:startEvent id="Event_0buknlv" name="交易开始">
      <bpmn2:outgoing>Flow_04a725z</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:userTask id="Activity_0b39rrp" name="dww2" activiti:formKey="dww2" activiti:assignee="dww" activiti:candidateUsers="dww" activiti:candidateGroups="" activiti:multiinstance_condition="1" multiinstance_type="None">
      <bpmn2:incoming>Flow_04a725z</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0os7xi4</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="Flow_04a725z" name="1111" sourceRef="Event_0buknlv" targetRef="Activity_0b39rrp" />
    <bpmn2:endEvent id="Event_02nbgvg" name="交易完成">
      <bpmn2:incoming>Flow_0os7xi4</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="Flow_0os7xi4" name="222" sourceRef="Activity_0b39rrp" targetRef="Event_02nbgvg" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_04a725z_di" bpmnElement="Flow_04a725z">
        <di:waypoint x="218" y="110" />
        <di:waypoint x="254" y="110" />
        <di:waypoint x="254" y="120" />
        <di:waypoint x="290" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="259" y="112" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0os7xi4_di" bpmnElement="Flow_0os7xi4">
        <di:waypoint x="390" y="120" />
        <di:waypoint x="462" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="417" y="102" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_0buknlv_di" bpmnElement="Event_0buknlv">
        <dc:Bounds x="182" y="92" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="178" y="135" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0b39rrp_di" bpmnElement="Activity_0b39rrp">
        <dc:Bounds x="290" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_02nbgvg_di" bpmnElement="Event_02nbgvg">
        <dc:Bounds x="462" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="458" y="145" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;
