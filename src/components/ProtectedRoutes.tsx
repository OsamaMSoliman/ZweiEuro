import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSigninCheck } from "reactfire";

export default function () {
    const { pathname } = useLocation();
    const { data: signInResult } = useSigninCheck();

    return (
        signInResult?.signedIn
            ? <Outlet />
            : <Navigate to={"/login"} state={{ from: pathname }} replace />
    );
}