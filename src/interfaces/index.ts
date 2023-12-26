export type TCollection = {
    A: number;
    D: number;
    F: number;
    G: number;
    J: number;
} | { "#": number };

export interface ICoinData {
    id?: string; // set at the time of uploading (note this is the same as image id)
    title: string
    description: string;
    year: number;
    collection: TCollection;
    category: TCategory
    modifiedBy: string;
}

export const CoinCategorys = {
    Bundesland_1: 'Bundesländer 1',
    Bundesland_2: 'Bundesländer 2',
    DE_Geschichte: 'Deutsche Geschichte',
    EU_Geschichte: 'Europäische Geschichte',
    Anderes: 'Anderes',
} as const;

export type TCategory = keyof typeof CoinCategorys