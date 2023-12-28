import useViewportWidth from "./useViewportWidth";
import { useLocation } from "react-router-dom";

// https://getbootstrap.com/docs/5.3/layout/breakpoints/
const BreakPointUpperLimit = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
    xxl: Infinity
} as const;

export type TBPUpperLimit = keyof typeof BreakPointUpperLimit;

// TODO: type path is TPath NOT string
export default function (PathBPLowerLimit: { [path: string]: TBPUpperLimit }) {
    const vpWidth = useViewportWidth();
    const { pathname } = useLocation();
    return vpWidth <= BreakPointUpperLimit[PathBPLowerLimit[pathname]];
}