import StyledFirebaseAuth from "../firebase/StyledFirebaseAuth";
import { fireAuth, useAuthContext } from "../firebase/AuthContext";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Button, CircularProgress } from "@mui/material";
import { Logout } from "@mui/icons-material";


export default function Login() {
    const { authUser, logOut } = useAuthContext();
    // https://github.com/firebase/firebaseui-web#configuration
    const uiConfig: firebaseui.auth.Config = {
        signInFlow: "popup",
        signInOptions: [
            {
                provider: EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false,
                signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
            },
            GoogleAuthProvider.PROVIDER_ID,
        ],
        signInSuccessUrl: "/",
    };

    return (<>
        {/* {!isLoading &&  <CircularProgress color="inherit" sx={{ ml: "50%", mt: "25%" }} />} */}
        {authUser ?
            <Button variant="contained" startIcon={<Logout />} onClick={() => logOut()}>sign out</Button>
            :
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fireAuth} />}
    </>);
}