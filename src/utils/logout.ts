import { getAuth } from "firebase/auth";

export const Logout = () => getAuth().signOut().then(() => console.log('signed out'));
