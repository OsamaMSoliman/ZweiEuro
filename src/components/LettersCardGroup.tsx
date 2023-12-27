import { CardGroup } from "react-bootstrap";
import { LetterCard } from "./LetterCard";
import { TCollection } from "../interfaces";

interface ILettersCardGroupProps {
    id: string;
    collection: TCollection;
    isStatic?: boolean;
}

export const LettersCardGroup = ({ id, collection, isStatic=false }: ILettersCardGroupProps) => (
    <CardGroup>
        {
            Object.entries(collection).map(([key, value]) => (
                <LetterCard key={key} coinId={id} letter={key} count={value} isStatic={isStatic} />
            ))
        }
    </CardGroup>
);
