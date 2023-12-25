import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CoinCard from '../components/CoinCard';

export default function CardGrid() {
    return (
        <Row xs={1} md={2} lg={4} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
                <Col key={idx}>
                    <CoinCard />
                </Col>
            ))}
        </Row>
    );
}
