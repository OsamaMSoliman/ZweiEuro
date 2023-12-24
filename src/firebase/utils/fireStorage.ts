import {
    FirebaseStorage, ref, uploadBytes,
    // StorageReference, getDownloadURL 
} from 'firebase/storage';

const baseFolder = "coinImgsDir";

export function getImgStorageRef(storage: FirebaseStorage, refKey: string) {
    return ref(storage, `/${baseFolder}/${refKey}`);
}

export function uploadCoinImg(storage: FirebaseStorage, refKey: string, imgFile: File) {
    uploadBytes(getImgStorageRef(storage, refKey), imgFile).catch((error) => console.log(error));;
}

// // using { useStorageDownloadURL } from 'reactfire' instead of this function!
// export async function downloadCoinImg(storageRef: StorageReference) {
//     return await getDownloadURL(storageRef).catch((error) => console.log(error));
// }