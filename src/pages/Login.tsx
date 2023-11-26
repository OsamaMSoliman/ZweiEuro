import StyledFirebaseAuth from "../firebase/StyledFirebaseAuth";
import { EmailAuthProvider, GoogleAuthProvider, getAuth, signOut } from "firebase/auth";
import { Button, CircularProgress } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useFirebaseApp, useSigninCheck } from "reactfire";


export default function Login() {
    const fireAuth = getAuth(useFirebaseApp());

    const logOut = () => { signOut(fireAuth); };

    const { status, data: singInResult } = useSigninCheck();
    console.log(`status=${status}`);
    console.log(`singInResult=${singInResult}`);

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
    if (status === "loading")
        return <CircularProgress color="inherit" sx={{ ml: "50%", mt: "25%" }} />;

    return (<>
        {singInResult.signedIn ?
            <Button variant="contained" startIcon={<Logout />} onClick={logOut}>sign out</Button>
            :
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fireAuth} />}
    </>);
}