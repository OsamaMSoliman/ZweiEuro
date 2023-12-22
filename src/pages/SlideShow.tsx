import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import { useDatabase, useDatabaseListData } from 'reactfire';
import { getBaseDBUploadRef } from '../firebase/utils/fireRealTimeDatabase';
import { SlideSheet } from '../components/SlideSheet';
import { CoinData } from '../interfaces';
import { Navigate } from 'react-router-dom';

export default function SlideShow() {
  const baseUploadRef = getBaseDBUploadRef(useDatabase());
  const { data } = useDatabaseListData<CoinData>(baseUploadRef, { idField: 'id' });  // tell firebase to automatically set id as id


  // TODO: this doesn't work in the emulator, but I suspect it will work with the real thing!
  // if database is empty, auto-direct to Upload
  if (data?.length === 0)
    return <Navigate to={"/upload"} />

  return (
    <Carousel>
      {data?.map(coinData => (
        <CarouselItem key={coinData.id}>
          <SlideSheet {...coinData} />
        </CarouselItem>
      ))}
    </Carousel>
  );
}



