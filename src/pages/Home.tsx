import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import CarouselCaption from 'react-bootstrap/CarouselCaption';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup, CardGroup, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { useDatabase, useDatabaseListData, useStorage, useStorageDownloadURL } from 'reactfire';
import { CoinData, CoinLetterType, de_crement, getBaseDBUploadRef, in_crement } from '../firebase/utils/fireRealTimeDatabase';
import { getImgStorageRef } from '../firebase/utils/fireStorage';
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

const SlideSheet: React.FC<CoinData> = ({ id, year, description, img_id, collection }) => {
  const { status, data: img_uri } = useStorageDownloadURL(getImgStorageRef(useStorage(), img_id));
  console.log("SlideSheet", status, img_uri);
  return (
    <>
      <Image src={img_uri} alt="image here" className='w-100 vh-100' style={{ objectFit: "cover" }} />
      <CarouselCaption>
        <h1>{year}</h1>
        <h3>{description}</h3>
        <CardGroup>
          {Object.entries(collection).map((value, idx) => (
            <LetterCard key={idx} coinId={id!} letter={value[0] as CoinLetterType} count={value[1]} />
          ))}
        </CardGroup>
      </CarouselCaption>
    </>
  );
};


interface ILetterCard {
  coinId: string;
  letter: CoinLetterType;
  count: number;
}

const LetterCard = ({ coinId, letter, count }: ILetterCard) => {
  const [open, setOpen] = useState(false);

  const onClick = () => setOpen(!open);

  const db = useDatabase();
  const increment = () => in_crement(db, coinId, letter);
  const decrement = () => de_crement(db, coinId, letter);

  return (
    <Card className="text-center">
      <Card.Header onClick={onClick} className={`bg-${count > 0 ? "info" : "danger"}`}>
        <h5 className='m-0'>
          {letter}
        </h5>
      </Card.Header>
      <Card.Body onClick={onClick} className='d-flex flex-column justify-content-center'>
        {count}
      </Card.Body>
      <Collapse in={open}>
        <Card.Footer className="text-muted">
          <ButtonGroup className='w-100'>
            <Button variant="outline-primary" onClick={increment}> + </Button>
            <Button variant="outline-danger" onClick={decrement}> - </Button>
          </ButtonGroup>
        </Card.Footer>
      </Collapse>
    </Card>
  );
}
