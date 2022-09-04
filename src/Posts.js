"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const react_select_1 = __importDefault(require("react-select"));
var CameraName;
(function (CameraName) {
    CameraName["Fhaz"] = "FHAZ";
    CameraName["Mast"] = "MAST";
    CameraName["Rhaz"] = "RHAZ";
})(CameraName = exports.CameraName || (exports.CameraName = {}));
var RoverName;
(function (RoverName) {
    RoverName["Curiosity"] = "Curiosity";
    RoverName["Opportunity"] = "Opportunity";
    RoverName["Spirit"] = "Spirit";
})(RoverName = exports.RoverName || (exports.RoverName = {}));
const selectOptions = [
    { value: "curiosity", label: "Curiosity" },
    { value: "spirit", label: "Spirit" },
    { value: "opportunity", label: "Opportunity" },
];
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
const StyledSelect = styled_components_1.default.div `
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem;
  align-items: center;
`;
const Posts = () => {
    const [posts, setPosts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [page, setPage] = (0, react_1.useState)(1);
    const [selectedValue, setSelectedValue] = (0, react_1.useState)(selectOptions[0]);
    const hasMoreData = posts.length < 2000;
    const handleErrors = (response) => {
        if (!response.ok)
            throw new Error(response.status.toString());
        return response;
    };
    const fetchPosts = (page, rover) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${page}&api_key=` +
            process.env.REACT_APP_NASA_KEY).then((res) => {
            handleErrors(res);
            return res.json();
        });
        return data;
    });
    const loadMorePosts = () => {
        setPage((page) => page + 1);
        setLoading(true);
        setTimeout(() => {
            fetchPosts(page, selectedValue.value).then((data) => {
                setPosts((prev) => [...prev, ...data.photos]);
            });
            setLoading(false);
        }, 300);
    };
    (0, react_1.useEffect)(() => {
        fetchPosts(1, selectedValue.value).then((data) => {
            setPosts(data.photos);
        });
    }, []);
    (0, react_1.useEffect)(() => {
        fetchPosts(1, selectedValue.value).then((data) => {
            setPosts(data.photos);
        });
    }, [selectedValue]);
    //@ts-ignore
    const handleSelectChange = (item) => {
        setSelectedValue(item);
    };
    return ((0, jsx_runtime_1.jsxs)(InfiniteScroll_1.default, Object.assign({ hasMoreData: hasMoreData, isLoading: loading, onBottomHit: loadMorePosts, loadOnMount: true }, { children: [(0, jsx_runtime_1.jsxs)(StyledSelect, { children: ["Choose a rover:", (0, jsx_runtime_1.jsx)(react_select_1.default, { className: "react-select", value: selectedValue, options: selectOptions, onChange: handleSelectChange })] }), (0, jsx_runtime_1.jsx)(StyledPosts, { children: posts.map((post, index) => {
                    return ((0, jsx_runtime_1.jsx)(Post_1.default, { roverName: post.rover.name, fullName: post.camera.full_name, landingDate: post.rover.landing_date, launchDate: post.rover.launch_date, imgSrc: post.img_src }));
                }) })] })));
};
exports.default = Posts;
