"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const ImgModal_1 = __importDefault(require("./ImgModal"));
const useModal_1 = __importDefault(require("./useModal"));
const StyledPost = styled_components_1.default.div `
  border: solid 1px black;
  display: flex;
  flex-direction: column;
  margin: 0.25rem;
  padding: 2rem;
`;
const Img = styled_components_1.default.img `
  width: 100%;
  object-fit: cover;
`;
const Post = ({ roverName, fullName, landingDate, launchDate, imgSrc, }) => {
    const { isShowing, toggle } = (0, useModal_1.default)();
    return ((0, jsx_runtime_1.jsxs)(StyledPost, { children: [(0, jsx_runtime_1.jsx)(Img, { src: imgSrc, alt: `Rover photo taken on ${landingDate}`, onClick: () => toggle() }), (0, jsx_runtime_1.jsxs)("p", { children: ["Launch date: ", launchDate] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Landing date: ", landingDate] }), (0, jsx_runtime_1.jsx)("p", { children: fullName }), (0, jsx_runtime_1.jsx)(ImgModal_1.default, { isShowing: isShowing, hide: toggle, src: imgSrc })] }));
};
exports.default = Post;
