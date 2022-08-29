"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useModal = () => {
    const [isShowing, setIsShowing] = (0, react_1.useState)(false);
    function toggle() {
        setIsShowing(!isShowing);
    }
    return {
        isShowing,
        toggle,
    };
};
exports.default = useModal;
