import { push, set, DatabaseReference, ref, Database, increment } from 'firebase/database';
import { coinFormData } from '../../pages/Upload';


// TODO: last modified by which {user}


const crement = (dbRef: DatabaseReference, amount: 1 | -1) => set(dbRef, increment(amount));

export type CoinLetterType = "A" | "D" | "F" | "G" | "J";

export function in_crement(db: Database, coinId: string, letter: CoinLetterType) {
    crement(ref(db, `coins/${coinId}/collection/${letter}`), 1);
}
export function de_crement(db: Database, coinId: string, letter: CoinLetterType) {
    crement(ref(db, `coins/${coinId}/collection/${letter}`), -1);
}



export interface CoinData {
    id?: string; // automatically set by firebase
    img_id: string;
    year: number;
    collection: CoinCollectionData;
    description: string;
}
export interface CoinCollectionData {
    A: number;
    D: number;
    F: number;
    G: number;
    J: number;
}

export function getBaseDBUploadRef(db: Database) {
    return ref(db, "coins");
}

export function uploadCoinData(db: Database, newCoinData: coinFormData) {
    const pushRef = push(getBaseDBUploadRef(db));
    const { imgFile, year, ...rest } = newCoinData;
    set(pushRef, {
        img_id: pushRef.key,
        year,
        collection: rest,
    } as CoinData).catch((error) => console.log(error));
    return pushRef.key;
}