import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function () {
    console.log("AppLayout");

    return (
        <div className="d-flex flex-column vh-100">
            <Header/>
            <main className="flex-fill" >
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}