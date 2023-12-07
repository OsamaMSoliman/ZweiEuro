import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import ProtectedRoutes from "./ProtectedRoutes";

export default function () {
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Login logOut />} />
                        <Route path="/" element={<ProtectedRoutes />}>
                            <Route index element={<Home />} />
                            <Route path="/upload" element={<Upload />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
}