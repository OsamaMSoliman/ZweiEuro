import { ReactNode } from "react";
//
import {
    // AppCheckProvider,
    AuthProvider, DatabaseProvider, StorageProvider, useFirebaseApp
} from "reactfire";
// 
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
// import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";



export default function ({ children }: { children: ReactNode }) {
    const firebaseApp = useFirebaseApp();
    const fireAuth = getAuth(firebaseApp);
    const fireRealtimeDB = getDatabase(firebaseApp);
    const fireStorage = getStorage(firebaseApp);

    console.log(location.hostname, process.env.NODE_ENV);

    if (
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        process.env.NODE_ENV !== 'production'
    ) {
        // Set up emulators
        connectAuthEmulator(fireAuth, 'http://localhost:9099');
        connectDatabaseEmulator(fireRealtimeDB, 'localhost', 9000);
        connectStorageEmulator(fireStorage, 'localhost', 9199);
    }

    // // https://firebase.google.com/docs/app-check/web/recaptcha-provider#project-setup
    // const appCheck = initializeAppCheck(firebaseApp, {
    //   provider: new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise "site" key */),
    //   isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
    // });


    return (
        // <AppCheckProvider sdk={appCheck}>
        <AuthProvider sdk={fireAuth} >
            <StorageProvider sdk={fireStorage}>
                <DatabaseProvider sdk={fireRealtimeDB}>
                    {children}
                </DatabaseProvider>
            </StorageProvider>
        </AuthProvider >
        // </AppCheckProvider>
    );
}