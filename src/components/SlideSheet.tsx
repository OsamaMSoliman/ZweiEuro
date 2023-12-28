import CarouselCaption from 'react-bootstrap/CarouselCaption';
import Image from 'react-bootstrap/Image';
import { useStorage, useStorageDownloadURL } from 'reactfire';
import { getImgStorageRef } from '../firebase/utils/fireStorage';
import { CoinCategorys, ICoinData } from '../interfaces';
import { LettersCardGroup } from './LettersCardGroup';
import { HeaderHeight } from './Header';

export const SlideSheet: React.FC<ICoinData> = ({ id, title, description, year, collection, category, modifiedBy }) => {
    const { data: img_uri } = useStorageDownloadURL(getImgStorageRef(useStorage(), id!));

    return (
        <div style={{ height: `calc(100vh - ${HeaderHeight}px)` }}>
            <Image src={img_uri} alt="image here" className='object-fit-contain w-100 h-100' />
            <CarouselCaption>
                <div className='d-flex justify-content-center mb-3'>
                    <div className='text-black-50 bg-secondary bg-gradient bg-opacity-25 rounded-5 p-3'>
                        <h1>{title} - {year}</h1>
                        <h3>{description}</h3>
                        <h4>{CoinCategorys[category]}</h4>
                        <h4>{modifiedBy}</h4>
                    </div>
                </div>
                <LettersCardGroup id={id!} collection={collection} />
            </CarouselCaption>
        </div>
    );
};