import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Upload } from "@mui/icons-material";

export default function () {
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/upload" element={<Upload />} />
                </Routes>
            </BrowserRouter>
        </main>
    );
}