import { push, set, DatabaseReference, ref, Database, increment } from 'firebase/database';
import { CoinData, CoinLetterType } from '../../interfaces';
import { getAuth } from 'firebase/auth';

const baseFolder = "coinsDB";

const crement = (dbRef: DatabaseReference, amount: 1 | -1) => set(dbRef, increment(amount));

export function in_crement(db: Database, coinId: string, letter: CoinLetterType) {
    crement(ref(db, `${baseFolder}/${coinId}/collection/${letter === "#" ? "" : letter}`), 1);
    if (getAuth().currentUser?.displayName)
        set(ref(db, `${baseFolder}/${coinId}/modifiedBy`), getAuth().currentUser?.displayName);
}
export function de_crement(db: Database, coinId: string, letter: CoinLetterType) {
    crement(ref(db, `${baseFolder}/${coinId}/collection/${letter === "#" ? "" : letter}`), -1);
    if (getAuth().currentUser?.displayName)
        set(ref(db, `${baseFolder}/${coinId}/modifiedBy`), getAuth().currentUser?.displayName);
}


export const getBaseDBUploadRef = (db: Database) => ref(db, baseFolder);

export function uploadCoinData(db: Database, newCoinData: CoinData) {
    const pushRef = push(getBaseDBUploadRef(db));
    const imgId = pushRef.key as string;
    newCoinData.id = imgId;
    set(pushRef, newCoinData).catch((error) => console.log(error));
    return imgId;
}