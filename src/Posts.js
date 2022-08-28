"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoverName = exports.CameraName = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Post_1 = __importDefault(require("./Post"));
const InfiniteScroll_1 = __importDefault(require("./InfiniteScroll"));
const styled_components_1 = __importDefault(require("styled-components"));
var CameraName;
(function (CameraName) {
    CameraName["Fhaz"] = "FHAZ";
    CameraName["Mast"] = "MAST";
    CameraName["Rhaz"] = "RHAZ";
})(CameraName = exports.CameraName || (exports.CameraName = {}));
var RoverName;
(function (RoverName) {
    RoverName["Curiosity"] = "Curiosity";
})(RoverName = exports.RoverName || (exports.RoverName = {}));
const StyledPosts = styled_components_1.default.div `
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 2px;
  row-gap: 0.5rem;
  margin: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const Posts = () => {
    const [posts, setPosts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [page, setPage] = (0, react_1.useState)(1);
    const hasMoreData = posts.length < 2000;
    // @ts-ignore
    const handleErrors = (response) => {
        if (!response.ok)
            throw new Error(response.status);
        return response;
    };
    const loadMorePosts = () => {
        setPage((page) => page + 1);
        setLoading(true);
        setTimeout(() => {
            fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=` + process.env.REACT_APP_NASA_KEY)
                .then(handleErrors)
                .then((response) => response.json())
                .then((data) => {
                // @ts-ignore
                setPosts((prev) => [...prev, ...data.photos]);
            });
            setLoading(false);
        }, 300);
    };
    (0, react_1.useEffect)(() => {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=` + process.env.REACT_APP_NASA_KEY)
            .then(response => response.json())
            .then((data) => {
            setPosts(data.photos);
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)(InfiniteScroll_1.default, Object.assign({ hasMoreData: hasMoreData, isLoading: loading, onBottomHit: loadMorePosts, loadOnMount: true }, { children: (0, jsx_runtime_1.jsx)(StyledPosts, { children: posts.map((post, index) => {
                return (0, jsx_runtime_1.jsx)(Post_1.default, { fullName: post.camera.full_name, landingDate: post.rover.landing_date, launchDate: post.rover.launch_date });
            }) }) })));
};
exports.default = Posts;
