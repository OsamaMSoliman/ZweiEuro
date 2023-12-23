import CarouselCaption from 'react-bootstrap/CarouselCaption';
import Image from 'react-bootstrap/Image';
import { CardGroup } from 'react-bootstrap';
import { useStorage, useStorageDownloadURL } from 'reactfire';
import { getImgStorageRef } from '../firebase/utils/fireStorage';
import { LetterCard } from './LetterCard';
import { CoinData, CoinLetterType } from '../interfaces';

export const SlideSheet: React.FC<CoinData> = ({ year, description, img_id, collection }) => {
    const { data: img_uri } = useStorageDownloadURL(getImgStorageRef(useStorage(), img_id!));

    return (
        <>
            <Image src={img_uri} alt="image here" className='w-100 vh-100' style={{ objectFit: "cover" }} />
            <CarouselCaption>
                <h1>{year}</h1>
                <h3>{description}</h3>
                <CardGroup>
                    {Object.entries(collection).map((value, idx) => (
                        <LetterCard key={idx} coinId={img_id!} letter={value[0] as CoinLetterType} count={value[1]} />
                    ))}
                </CardGroup>
            </CarouselCaption>
        </>
    );
};