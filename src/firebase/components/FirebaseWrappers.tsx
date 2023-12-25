import { ReactNode } from "react";
//
import { AuthProvider, DatabaseProvider, StorageProvider, useFirebaseApp } from "reactfire";
// 
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";



export default function ({ children }: { children: ReactNode }) {
    const firebaseApp = useFirebaseApp();
    const fireAuth = getAuth(firebaseApp);
    const fireRealtimeDB = getDatabase(firebaseApp);
    const fireStorage = getStorage(firebaseApp);

    console.log(`Hostname: ${location.hostname}, Environment: ${process.env.NODE_ENV}`);

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


    return (
        <AuthProvider sdk={fireAuth} >
            <StorageProvider sdk={fireStorage}>
                <DatabaseProvider sdk={fireRealtimeDB}>
                    {children}
                </DatabaseProvider>
            </StorageProvider>
        </AuthProvider >
    );
}