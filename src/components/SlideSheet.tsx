import CarouselCaption from 'react-bootstrap/CarouselCaption';
import Image from 'react-bootstrap/Image';
import { CardGroup } from 'react-bootstrap';
import { useStorage, useStorageDownloadURL } from 'reactfire';
import { getImgStorageRef } from '../firebase/utils/fireStorage';
import { LetterCard } from './LetterCard';
import { CoinCategorys, CoinData, CoinLetterType } from '../interfaces';

export const SlideSheet: React.FC<CoinData> = ({ id, title, description, year, collection, category, modifiedBy }) => {
    const { data: img_uri } = useStorageDownloadURL(getImgStorageRef(useStorage(), id!));

    return (
        <>
            <Image src={img_uri} alt="image here" className='w-100 vh-100' style={{ objectFit: "cover" }} />
            <CarouselCaption>
                <h1>{title} - {year}</h1>
                <h3>{description}</h3>
                <h4>{CoinCategorys[category]}</h4>
                <h4>{modifiedBy}</h4>
                <CardGroup>
                    {"number" === typeof collection ?
                        <LetterCard coinId={id!} letter={"count" as CoinLetterType} count={collection} />
                        :
                        Object.entries(collection).map(([key, value]) => (
                            <LetterCard key={key} coinId={id!} letter={key as CoinLetterType} count={value} />
                        ))
                    }
                </CardGroup>
            </CarouselCaption>
        </>
    );
};