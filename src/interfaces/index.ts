export type CoinLetterType = "A" | "D" | "F" | "G" | "J";

export interface CoinData {
    id?: string; // automatically set by firebase
    img_id?: string; // set at the time of uploading
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