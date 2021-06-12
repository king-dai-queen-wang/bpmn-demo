import CustomContextPadProvider from "./CustomContextPadProvider";
import CustomPalette from "../../customer-pattle/custom/CustomPalette";

export default {
    __init__: ["contextPadProvider", 'paletteProvider'],
    // 自定义的context pad
    contextPadProvider: ["type", CustomContextPadProvider],
    // 自定义的palette
    paletteProvider: ["type", CustomPalette],
};
