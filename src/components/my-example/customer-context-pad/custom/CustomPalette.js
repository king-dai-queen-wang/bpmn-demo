import { assign } from "min-dash";

export default function PaletteProvider(
    palette,
    create,
    elementFactory,
    handTool,
    lassoTool,
    spaceTool,
    globalConnect,
    translate
) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.handTool = handTool;
    this.lassoTool = lassoTool;
    this.spaceTool = spaceTool;
    this.globalConnect = globalConnect;
    this.translate = translate;

    palette.registerProvider(this);
}

PaletteProvider.$inject = [
    "palette",
    "create",
    "elementFactory",
    "handTool",
    "lassoTool",
    "spaceTool",
    "globalConnect",
    "translate"
];

PaletteProvider.prototype.getPaletteEntries = function (element) {
    const {
        create,
        elementFactory,
        handTool,
        lassoTool,
        spaceTool,
        globalConnect,
        translate
    } = this;

    function createAction(type, group, className, title, options) {
        function createListener(event) {
            var shape = elementFactory.createShape(assign({ type: type }, options));

            if (options) {
                shape.businessObject.di.isExpanded = options.isExpanded;
            }

            create.start(event, shape);
        }

        var shortType = type.replace(/^bpmn:/, "");

        return {
            group: group,
            className: className,
            title: title || translate("Create {type}", { type: shortType }),
            action: {
                dragstart: createListener,
                click: createListener
            }
        };
    }

    return {
        "lasso-tool": {
            group: "tools", // group： 定义这个shape属于哪个组，主要有tools、event、gateway和activity可以选择
            className: "bpmn-icon-lasso-tool", // className： 定义这个shape的chass名称，可以通过这个class给shape指定具体的样式
            title: " 选择工具框", // title： 定义这个shape的title，也就是鼠标移动到shape上的提示
            action: { // action： 用户操作时触发的事件
                click: function (event) {
                    lassoTool.activateSelection(event);
                }
            }
        },
        // 中划线/分割线
        "tool-separator": {
            group: "tools",
            separator: true
        },

        "create.start-event": createAction(
            "bpmn:StartEvent",
            "event",
            "bpmn-icon-start-event-none",
            "创建开始节点"
        ),
        "create.end-event": createAction(
            "bpmn:EndEvent",
            "event",
            "bpmn-icon-end-event-none",
            "创建结束节点"
        ),
        "create.user-task": createAction(
            "bpmn:UserTask",
            "activity",
            "bpmn-icon-user-task",
            "创建用户任务"
        ),
        "create.exclusive-gateway": createAction(
            "bpmn:ExclusiveGateway",
            "gateway",
            "bpmn-icon-gateway-xor",
            "创建排他网关"
        ),
        "create.timer-intermediate-event": createAction(
            "bpmn:IntermediateThrowEvent",
            "event",
            "bpmn-icon-intermediate-event-catch-timer",
            "创建 IntermediateThrowEvent",
            { eventDefinitionType: "bpmn:TimerEventDefinition" }
        )
    };
};