import { TPath, isTPath } from "../interfaces/Paths";
import useViewportWidth from "./useViewportWidth";
import { useLocation } from "react-router-dom";

// https://getbootstrap.com/docs/5.3/layout/breakpoints/
const BreakPointUpperLimit = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
    xxl: Infinity,
} as const;

export type TBPUpperLimit = keyof typeof BreakPointUpperLimit;

export type TPathToBP = Partial<Record<TPath, TBPUpperLimit>>;

export default function useWarningOnPath(PathBPLowerLimit: TPathToBP): boolean {
    const vpWidth = useViewportWidth();
    const { pathname } = useLocation();
    // By default xs is when the warning should start, regardless of the path!
    return isTPath(pathname) ? vpWidth <= BreakPointUpperLimit[PathBPLowerLimit[pathname] ?? "xs"] : false;
}