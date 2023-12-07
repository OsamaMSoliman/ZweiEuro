import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from './config/firebase.ts'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>
);
