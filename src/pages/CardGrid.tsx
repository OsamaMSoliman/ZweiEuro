import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CoinCard from '../components/CoinCard';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getBaseDBUploadRef } from '../firebase/utils/fireRealTimeDatabase';
import { useDatabase, useDatabaseObjectData } from 'reactfire';
import { ICoinData } from '../interfaces';
import { Navigate } from 'react-router-dom';

export default function CardGrid() {
    const [t] = useTranslation();
    const baseUploadRef = getBaseDBUploadRef(useDatabase());
    const { data, status, error } = useDatabaseObjectData<{ [key: string]: ICoinData }>(baseUploadRef);

    if (status === "error")
        console.log(error);

    const { NO_ID_FIELD, ...coinObjs } = data ?? {};
    const coins = Object.entries(coinObjs ?? {});

    // if not loading and database is empty, auto-direct to Upload
    if (status !== "loading" && coins.length === 0)
        return <Navigate to={"/upload"} replace={true} />

    return (
        <Container >
            <Row xs={1} md={2} lg={4}>
                {coins.map(([key, value]) => (
                    <Col key={key} className='d-flex justify-content-center'>
                        <CoinCard {...value} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
