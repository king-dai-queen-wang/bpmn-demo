// AuthorityPropertiesProvider.js

import inherits from 'inherits';
// 引入自带的PropertiesActivator,  因为我们要用到它来处理eventBus
import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';
import TitleProps from './parts/TitleProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';

function createAuthorityTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {
    // 配置 authority group
    var editAuthorityGroup = {
        id: 'edit-authority',
        label: '编辑权限',
        entries: [] // 属性集合
    }
    // 每个属性都有自己的props方法
    // 添加 title 属性
    TitleProps(editAuthorityGroup, element, translate);
    // OtherProps1(editAuthorityGroup, element);
    // OtherProps2(editAuthorityGroup, element);

    return [
        editAuthorityGroup
    ];
}

function createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {
    // 配置 generalGroup
    var generalGroup = {
        id: 'general',
        label: 'General',
        entries: []
    };
    idProps(generalGroup, element, translate);
    nameProps(generalGroup, element, bpmnFactory, canvas, translate);
    processProps(generalGroup, element, translate);
    // 配置 detail group
    var detailsGroup = {
        id: 'details',
        label: 'Details',
        entries: []
    };
    linkProps(detailsGroup, element, translate);
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);
    // 胚子document group
    var documentationGroup = {
        id: 'documentation',
        label: 'Documentation',
        entries: []
    };

    documentationProps(documentationGroup, element, bpmnFactory, translate);
    // 返回3个定义好的group
    return [
        generalGroup,
        detailsGroup,
        documentationGroup
    ];
}

// 这里是要用到什么就引入什么
export default function AuthorityPropertiesProvider(
    eventBus, bpmnFactory, canvas,
    elementRegistry, translate
) {
    PropertiesActivator.call(this, eventBus);

    this.getTabs = function (element) {
        var generalTab = {
            id: 'general',
            label: 'General',
            groups: createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
        };
        var authorityTab = {
            id: 'authority',
            label: '权限',
            groups: createAuthorityTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
        };
        return [
            generalTab,
            authorityTab
        ];
    }
}

inherits(AuthorityPropertiesProvider, PropertiesActivator);