"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledPost = styled_components_1.default.div `
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  margin: 0.25rem;
  padding: 2rem;
`;
const Post = ({ fullName, landingDate, launchDate }) => {
    return ((0, jsx_runtime_1.jsxs)(StyledPost, { children: [(0, jsx_runtime_1.jsx)("h2", { children: fullName }), (0, jsx_runtime_1.jsxs)("p", { children: ["Launch date: ", launchDate] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Landing date: ", landingDate] })] }));
};
exports.default = Post;
