import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import { useDatabase, useDatabaseObjectData } from 'reactfire';
import { getBaseDBUploadRef } from '../firebase/utils/fireRealTimeDatabase';
import { SlideSheet } from '../components/SlideSheet';
import { ICoinData } from '../interfaces';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SlideShow() {
  const baseUploadRef = getBaseDBUploadRef(useDatabase());

  // as stated by of the following, useDatabaseListData has a bug that doesn't make it sync if it was initially empty
  // that's why I need to create any empty placeholder and skip it on getting the data!!!
  //https://github.com/FirebaseExtended/reactfire/issues/531
  //https://github.com/FirebaseExtended/reactfire/discussions/497
  // So I use instead : useDatabaseObjectData (no need for placeholders anymore)
  const { data, status, error } = useDatabaseObjectData<{ [key: string]: ICoinData }>(baseUploadRef);

  if (status === "error")
    console.log(error);

  const { NO_ID_FIELD, ...coinObjs } = data ?? {};
  const coins = Object.entries(coinObjs ?? {});

  // if not loading and database is empty, auto-direct to Upload
  if (status !== "loading" && coins.length === 0)
    return <Navigate to={"/upload"} replace={true} />


  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);

    if (state)
      setIndex(coins.findIndex(item => item[0] === state.id))
  }, [state])

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} pause="hover">
      {coins.map(([key, coinData]) => (
        <CarouselItem key={key}>
          <SlideSheet {...coinData} />
        </CarouselItem>
      ))}
    </Carousel>
  );
}



