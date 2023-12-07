import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import CarouselCaption from 'react-bootstrap/CarouselCaption';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup, CardGroup, Collapse, Spinner } from 'react-bootstrap';
import { useState } from 'react';


interface ItemProps {
  title: string;
  imgUrl: string;
  counts: number[];
}

// https://picsum.photos/800/400
const example: ItemProps[] = [
  {
    title: "2021",
    imgUrl: "https://fastly.picsum.photos/id/573/800/400.jpg?hmac=dfyzcar86RFbKHM0RcHGtUiXNwPYNIcHXIpMhwmvqvI",
    counts: [1, 2, 3, 4]
  },
  // {
  //   title: "2022",
  //   imgUrl: "https://fastly.picsum.photos/id/46/800/400.jpg?hmac=JNBsJrmhRAtJlKGk7X0Xbrg1pxtTd5jiEFsHs-k8sR8",
  //   counts: [2, 2]
  // }, {
  //   title: "2023",
  //   imgUrl: "https://fastly.picsum.photos/id/872/800/400.jpg?hmac=YMpq7PPCC_MymdOKUU2IwuHRNo0pI6FXr1fK3TKcoZQ",
  //   counts: [3, 3, 3]
  // },
];

export default function SlideShow() {
  return (
    <Carousel>
      {example.map((v, i) => (
        <CarouselItem key={i}>
          <SlideSheet {...v} />
        </CarouselItem>
      ))}
    </Carousel>
  );
}

const letters = ["A", "D", "F", "G", "J"];

const SlideSheet: React.FC<ItemProps> = ({ title, imgUrl, counts }) => {
  return (
    <>
      <Image className='d-block w-100' src={imgUrl} />
      <CarouselCaption>
        <h1>{title}</h1>
        <h3>{title}</h3>
        <CardGroup>
          {letters.map((v, i) => (<LetterCard key={v} letter={v} count={i} />))}
        </CardGroup>
      </CarouselCaption>
    </>
  );
};

const LetterCard = ({ letter, count }: { letter: string, count: number }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => setOpen(!open);

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
            <Button variant="outline-primary"> + </Button>
            <Button variant="outline-danger"> - </Button>
          </ButtonGroup>
        </Card.Footer>
      </Collapse>
    </Card>
  );
}
