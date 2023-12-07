import { AppCheckProvider, AuthProvider, useFirebaseApp } from "reactfire";
// 
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
// import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
// 
import Routing from "./components/Routing";


export default function () {
  const firebaseApp = useFirebaseApp();
  const fireAuth = getAuth(firebaseApp);

  // if (location.hostname === "localhost") {
  if (process.env.NODE_ENV !== 'production') {
    // Set up emulators
    connectAuthEmulator(fireAuth, 'http://localhost:9099');
    connectDatabaseEmulator(getDatabase(firebaseApp), 'localhost', 9000);
    connectStorageEmulator(getStorage(firebaseApp), 'localhost', 9199);
  }

  // // https://firebase.google.com/docs/app-check/web/recaptcha-provider#project-setup
  // const appCheck = initializeAppCheck(firebaseApp, {
  //   provider: new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise "site" key */),
  //   isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
  // });
  
  return (
    <>
      {/* <AppCheckProvider sdk={appCheck}> */}
      <AuthProvider sdk={fireAuth}>
        <Routing />
      </AuthProvider>
      {/* </AppCheckProvider> */}
    </>
  );
}