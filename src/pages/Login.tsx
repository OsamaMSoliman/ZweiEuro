import StyledFirebaseAuth from "../firebase/StyledFirebaseAuth";
import { EmailAuthProvider, GoogleAuthProvider, getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useSigninCheck } from "reactfire";


export default function Login({ logOut = false }: { logOut?: boolean }) {
    const fireAuth = getAuth();
    const { status, data: singInResult } = useSigninCheck();


    useEffect(() => {
        console.log("Once", logOut, fireAuth.currentUser);
        if (logOut)
            signOut(fireAuth);
    }, []);


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
        return <Spinner animation="border" variant="primary" />;

    if (!singInResult?.signedIn)
        return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fireAuth} />
}