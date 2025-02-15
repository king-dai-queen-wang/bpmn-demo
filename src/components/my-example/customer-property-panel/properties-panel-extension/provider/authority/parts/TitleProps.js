import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
    is
} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element, translate) {
    if (is(element, 'bpmn:StartEvent')) { // 可以在这里做类型判断
        group.entries.push(entryFactory.textField(translate, {
            id: 'title',
            description: '权限的标题',
            label: '标题',
            modelProperty: 'title'
        }));
        console.log(222)
    }
}