import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Login from "../pages/Login";
import SlideShow from "../pages/SlideShow";
import Upload from "../pages/Upload";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from "../pages/NotFound";

export default function () {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<ProtectedRoutes />}>
                        <Route index element={<SlideShow />} />
                        <Route path="/upload" element={<Upload />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}