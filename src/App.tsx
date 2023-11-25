import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import { AuthContextProvider } from "./firebase/AuthContext";

export default function () {
  return (
    <>
      <AuthContextProvider>
        <header>Header</header>
        <main>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </BrowserRouter>
        </main>
      </AuthContextProvider>
      <footer>Footer</footer>
    </>
  );
}