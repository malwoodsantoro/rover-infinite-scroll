"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const isBottom = (ref) => {
    if (!ref.current) {
        return false;
    }
    return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
};
const InfiniteScroll = ({ onBottomHit, isLoading, hasMoreData, loadOnMount, children }) => {
    const [initialLoad, setInitialLoad] = (0, react_1.useState)(true);
    const contentRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (loadOnMount && initialLoad) {
            onBottomHit();
            setInitialLoad(false);
        }
    }, [onBottomHit, loadOnMount, initialLoad]);
    (0, react_1.useEffect)(() => {
        const onScroll = () => {
            if (!isLoading && hasMoreData && isBottom(contentRef)) {
                onBottomHit();
            }
        };
        document.addEventListener('scroll', onScroll);
        return () => document.removeEventListener('scroll', onScroll);
    }, [onBottomHit, isLoading, hasMoreData]);
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: contentRef }, { children: children }));
};
exports.default = InfiniteScroll;
