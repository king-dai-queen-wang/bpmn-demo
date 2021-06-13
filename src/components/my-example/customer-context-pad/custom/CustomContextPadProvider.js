import { assign } from "min-dash";
import store from "../../../../store";

export default function ContextPadProvider(
    config,
    injector,
    contextPad,
    modeling,
    elementFactory,
    connect,
    create,
    translate
) {
    this.modeling = modeling;
    this.elementFactory = elementFactory;
    this.connect = connect;
    this.create = create;
    this.translate = translate;
    config = config || {};

    if (config.autoPlace !== false) {
        this.autoPlace = injector.get("autoPlace", false);
    }

    contextPad.registerProvider(this); // 定义这是一个contextPad
}

ContextPadProvider.$inject = [
    "config.contextPad",
    "injector",
    "contextPad",
    "modeling",
    "elementFactory",
    "connect",
    "create",
    "translate"
];

ContextPadProvider.prototype.getContextPadEntries = function (element) {
    const {
        autoPlace,
        create,
        elementFactory,
        translate,
        modeling,
        connect
    } = this;

    function appendAction(type, className, title, options) {
        function appendStart(event, element) {
            var shape = elementFactory.createShape(assign({ type: type }, options));
            create.start(event, shape, {
                source: element
            });
        }

        var append = autoPlace
            ? function (event, element) {
                var shape = elementFactory.createShape(
                    assign({ type: type }, options)
                );
                autoPlace.append(element, shape);
            }
            : appendStart;

        return {
            group: "model",
            className: className,
            title: title,
            action: {
                dragstart: appendStart,
                click: append
            }
        };
    }

    function appendTask(event, element) {
        if (autoPlace) {
            const shape = elementFactory.createShape({ type: 'bpmn:Task' });
            autoPlace.append(element, shape);
        } else {
            appendTaskStart(event, element);
        }
    }

    function appendTaskStart(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:Task' });
        create.start(event, shape, element);
    }

    function removeElement(e) {
        modeling.removeElements([element]);
    }

    function clickElement(e) {
        store.commit("SETNODEINFO", element);
        store.commit("TOGGLENODEVISIBLE", true);
    }


    var actions = {};

    if (
        element.type === "bpmn:UserTask" ||
        element.type === "bpmn:SequenceFlow"
    ) {
        assign(actions, {
            edit: {
                group: "edit",
                className: "bpmn-icon-business-rule",
                title: translate("属性"),
                action: {
                    click: clickElement
                }
            }
        });
    }

    assign(actions, {
        'append.lindaidai-task': {
            group: 'model',
            className: 'icon-custom lindaidai-task',
            title: translate('创建一个类型为lindaidai-task的任务节点'),
            action: {
                click: appendTask,
                dragstart: appendTaskStart
            }
        },
        delete: {
            group: "edit",
            className: "bpmn-icon-trash",
            title: translate("Remove"),
            action: {
                click: removeElement
            }
        }
    });

    return actions;
};