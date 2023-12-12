import { getAuth } from "firebase/auth";
// import { useAuth } from "reactfire"; Can't be used outside a functional component!

export const Logout = () => getAuth().signOut().then(() => console.log('signed out'));
