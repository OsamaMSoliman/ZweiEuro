import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function () {
    return (
        //  solution 1
        <>
            <Header />
            <Outlet />
            <Footer />
        </>

        // //  solution 2
        // <div className="d-flex flex-column vh-100">
        //     <Header />
        //     <main className="flex-grow-1 overflow-hidden" >
        //         <Outlet />
        //     </main>
        //     <Footer />
        // </div>
    );
}