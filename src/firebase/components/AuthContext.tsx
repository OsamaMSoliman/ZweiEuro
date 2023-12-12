import { firebaseApp } from '../firebase';
import { onAuthStateChanged, signOut, User, getAuth } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// ========================== interfaces ========================== //
interface AuthInfo {
    authUser?: User,
    isLoading: boolean,
    logOut: Function
}

// ========================== context ========================== //
const AuthUserContext = createContext<AuthInfo>({
    isLoading: false,
    logOut: async () => { }
});

// ========================== exports ========================== //
console.count("FireAuth");
export const fireAuth = getAuth(firebaseApp);

export function AuthContextProvider({ children }: { children: ReactNode }) {

    const [authUser, setAuthUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(false);

    const logOut = () => signOut(fireAuth).then(() => setAuthUser(undefined));

    // Listen for Firebase Auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fireAuth, async (user) => {
            setIsLoading(true);
            console.count(`Auth state changed: ${user}`);
            setAuthUser(user ?? undefined);
            console.count(`Current authUser: ${authUser}`);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return <AuthUserContext.Provider
        value={{
            authUser,
            isLoading,
            logOut,
        }}>
        {children}
    </AuthUserContext.Provider>;
}

export const useAuthContext = () => useContext(AuthUserContext);