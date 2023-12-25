import { CardGroup } from "react-bootstrap";
import { CoinCollectionType, CoinLetterType } from "../interfaces";
import { LetterCard } from "./LetterCard";

interface ILettersTableProps {
    id: string;
    collection: CoinCollectionType;
}

export default function LettersCardGroup({ id, collection }: ILettersTableProps) {
    return (
        <CardGroup>
            {"number" === typeof collection ?
                <LetterCard coinId={id!} letter={"#"} count={collection} />
                :
                Object.entries(collection).map(([key, value]) => (
                    <LetterCard key={key} coinId={id!} letter={key as CoinLetterType} count={value} />
                ))
            }
        </CardGroup>
    );
}