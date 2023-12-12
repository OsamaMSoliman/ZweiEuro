import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./firebase/configs/fireConfig";
import FirebaseWrappers from "./firebase/components/FirebaseWrappers";
import Routing from "./components/Routing";

export default function () {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseWrappers>
        <Routing />
      </FirebaseWrappers>
    </FirebaseAppProvider>
  );
}
