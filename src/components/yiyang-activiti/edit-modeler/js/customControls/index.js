import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
// 自定义 contextPad 和 palette
export default {
    __init__: [ 'contextPadProvider', 'customPalette' ],
    contextPadProvider: [ 'type', CustomContextPad ],
    customPalette: [ 'type', CustomPalette ]
};