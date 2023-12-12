import { push, set, DatabaseReference, ref, Database, increment } from 'firebase/database';
import { CoinData, CoinLetterType } from '../../interfaces';

// TODO: last modified by which {user}

const crement = (dbRef: DatabaseReference, amount: 1 | -1) => set(dbRef, increment(amount));

export function in_crement(db: Database, coinId: string, letter: CoinLetterType) {
    crement(ref(db, `coins/${coinId}/collection/${letter}`), 1);
}
export function de_crement(db: Database, coinId: string, letter: CoinLetterType) {
    crement(ref(db, `coins/${coinId}/collection/${letter}`), -1);
}


export const getBaseDBUploadRef = (db: Database) => ref(db, "coins");

export function uploadCoinData(db: Database, newCoinData: CoinData) {
    const pushRef = push(getBaseDBUploadRef(db));
    const imgId = pushRef.key as string;
    newCoinData.img_id = imgId;
    set(pushRef, newCoinData).catch((error) => console.log(error));
    return imgId;
}