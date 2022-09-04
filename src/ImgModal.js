"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = __importDefault(require("styled-components"));
const ModalOverlay = styled_components_1.default.div `
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;
const ModalWrapper = styled_components_1.default.div `
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;
const ModalMain = styled_components_1.default.div `
  z-index: 100;
  width: 40rem;
  background: white;
  position: relative;
  margin: 10rem auto;
  border-radius: 3px;
  max-width: 500px;
  padding: 2rem;
  > p {
    color: gray;
  }
`;
const ModalCloseButton = styled_components_1.default.div `
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  opacity: 0.3;
  cursor: pointer;
  border: none;
`;
const Img = styled_components_1.default.img `
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ImgModal = ({ isShowing, hide, src }) => isShowing
    ? react_dom_1.default.createPortal((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(ModalOverlay, {}), (0, jsx_runtime_1.jsx)(ModalWrapper, { children: (0, jsx_runtime_1.jsxs)(ModalMain, { children: [(0, jsx_runtime_1.jsx)(ModalCloseButton, Object.assign({ onClick: () => hide() }, { children: "X" })), (0, jsx_runtime_1.jsx)(Img, { src: src, alt: `Large photo` })] }) })] }), document.body)
    : null;
exports.default = ImgModal;
