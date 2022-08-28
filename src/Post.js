"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const StyledPost = styled_components_1.default.div `
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  margin: 0.25rem;
  padding: 2rem;
`;
const Post = ({ fullName, landingDate, launchDate }) => {
    return (React.createElement(StyledPost, null,
        React.createElement("h2", null, fullName),
        React.createElement("p", null,
            "Launch date: ",
            launchDate),
        React.createElement("p", null,
            "Landing date: ",
            landingDate)));
};
exports.default = Post;
