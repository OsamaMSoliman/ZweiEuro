import CarouselCaption from 'react-bootstrap/CarouselCaption';
import Image from 'react-bootstrap/Image';
import { useStorage, useStorageDownloadURL } from 'reactfire';
import { getImgStorageRef } from '../firebase/utils/fireStorage';
import { CoinCategorys, ICoinData } from '../interfaces';
import { LettersCardGroup } from './LettersCardGroup';

export const SlideSheet: React.FC<ICoinData> = ({ id, title, description, year, collection, category, modifiedBy }) => {
    const { data: img_uri } = useStorageDownloadURL(getImgStorageRef(useStorage(), id!));

    return (
        <>
            <Image src={img_uri} alt="image here" className='w-100 vh-100' style={{ objectFit: "cover" }} />
            <CarouselCaption>
                <h1>{title} - {year}</h1>
                <h3>{description}</h3>
                <h4>{CoinCategorys[category]}</h4>
                <h4>{modifiedBy}</h4>
                <LettersCardGroup id={id!} collection={collection} />
            </CarouselCaption>
        </>
    );
};