import { useEffect, useState } from "react";

// https://getbootstrap.com/docs/5.3/layout/breakpoints/
const BreakPoints = [
    ['xs', 0, 576],
    ['sm', 576, 768],
    ['md', 768, 992],
    ['lg', 992, 1200],
    ['xl', 1200, 1400],
    ['xxl', 1400, Infinity]
] as const;

type TBreakPoint = typeof BreakPoints[number][0];

export default function () {
    const [screenWidth, setScreenWidth] = useState<TBreakPoint>("xxl");

    useEffect(() => {
        const handleWindowSizeChange = () => {
            for (const [key, start, end] of BreakPoints)
                if (start <= window.innerWidth && window.innerWidth < end)
                    setScreenWidth(key);
        }
        window.addEventListener('resize', handleWindowSizeChange);
        return () => window.removeEventListener('resize', handleWindowSizeChange);
    }, []);

    return screenWidth;
}