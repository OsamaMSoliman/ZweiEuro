import StyledFirebaseAuth from "../firebase/StyledFirebaseAuth";
import { EmailAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";


export default function Login() {
    // NOTE: getAuth and useAuth won't trigger useEffect on being updated, as if they don't have listeners in them???
    // that's why I used useSigninCheck, also useUser would have worked fine!
    const { data: signInResult } = useSigninCheck();
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (signInResult?.signedIn)
            navigate(state?.from || "/", { replace: true });
    }, [signInResult]);


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
        // // signInSuccessUrl: "/",
        // callbacks: {
        //     signInSuccessWithAuthResult(authResult, redirectUrl) {
        //         console.log(authResult,redirectUrl) ;
        //         if (authResult.user)
        //             navigate(state?.from || "/", { replace: true });
        //         return false;
        //     },
        // }
    };

    return (
        <Container className="d-flex flex-column justify-content-center h-100">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
        </Container>
    );
}