import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
import SizeWarning from "./SizeWarning";

export default function () {
    return (
        <ThemeProvider
            breakpoints={['xxl', 'xl', 'lg', 'md', 'sm']}
            minBreakpoint="sm"
        >
            {/* //  solution 1 */}
            <>
                <Header />
                <Outlet />
                <Footer />
            </>

            <SizeWarning />
        </ThemeProvider>
    );
}

// //  solution 2
// <div className="d-flex flex-column vh-100">
//     <Header />
//     <main className="flex-grow-1 overflow-hidden" >
//         <Outlet />
//     </main>
//     <Footer />
// </div> 