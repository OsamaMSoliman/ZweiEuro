import { FirebaseStorage, ref, uploadBytes, StorageReference, getDownloadURL } from 'firebase/storage';


export function getImgStorageRef(storage: FirebaseStorage, refKey: string) {
    return ref(storage, `/coins/${refKey}`);
}

export function uploadCoinImg(storage: FirebaseStorage, refKey: string, imgFile: File) {
    uploadBytes(getImgStorageRef(storage, refKey), imgFile).catch((error) => console.log(error));;
}

// // using { useStorageDownloadURL } from 'reactfire' instead of this function!
// export async function downloadCoinImg(storageRef: StorageReference) {
//     return await getDownloadURL(storageRef).catch((error) => console.log(error));
// }