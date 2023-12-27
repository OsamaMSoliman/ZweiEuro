import Card from 'react-bootstrap/Card';
import { CoinCategorys, ICoinData } from '../interfaces';
import { useTranslation } from 'react-i18next';
import { useStorage, useStorageDownloadURL } from 'reactfire';
import { getImgStorageRef } from '../firebase/utils/fireStorage';
import { LettersCardGroup } from './LettersCardGroup';
import Link from './Link';

export default function CoinCard({ id, title, description, year, collection, category, modifiedBy }: ICoinData) {
    const { data: img_uri } = useStorageDownloadURL(getImgStorageRef(useStorage(), id!));

    const [t] = useTranslation();

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img_uri} />
            <Card.Body>
                <Card.Title>{title} - {year}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{CoinCategorys[category]}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <LettersCardGroup id={id!} collection={collection} isStatic />
                <Link to="/" className='stretched-link' state={{ id }} />
            </Card.Body>
            <Card.Footer className="text-muted">{t("coin-card.modified-by")} : {modifiedBy}</Card.Footer>
        </Card>
    );
}