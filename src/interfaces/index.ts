export interface CoinData {
    id?: string; // set at the time of uploading (note this is the same as image id)
    title: string
    description: string;
    year: number;
    collection: CoinCollectionData | number; // ausländisch
    category: CoinCategoryType
    modifiedBy: string;
}
export interface CoinCollectionData {
    A: number;
    D: number;
    F: number;
    G: number;
    J: number;
}

export type CoinLetterType = keyof CoinCollectionData | "count";

export const CoinCategorys = Object.freeze({
    Bundesland_1: 'Bundesländer 1',
    Bundesland_2: 'Bundesländer 2',
    DE_Geschichte: 'Deutsche Geschichte',
    EU_Geschichte: 'Europäische Geschichte',
    Anderes: 'Anderes',
});

export type CoinCategoryType = keyof typeof CoinCategorys