import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

export default function () {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { data: singInResult } = useSigninCheck();

    if (!!singInResult?.signedIn || pathname.endsWith("login"))
        return <Outlet />;
    navigate("/login");
}