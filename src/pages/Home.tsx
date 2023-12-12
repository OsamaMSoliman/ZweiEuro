import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import { useDatabase, useDatabaseListData } from 'reactfire';
import { getBaseDBUploadRef } from '../firebase/utils/fireRealTimeDatabase';
import { SlideSheet } from '../components/SlideSheet';
import { CoinData } from '../interfaces';
// import "./carousel.css"

export default function SlideShow() {
  const baseUploadRef = getBaseDBUploadRef(useDatabase());
  const { data } = useDatabaseListData<CoinData>(baseUploadRef, { idField: 'id' });  // tell firebase to automatically set id as id

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



