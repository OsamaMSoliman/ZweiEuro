import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { useDatabase } from 'reactfire';
import { de_crement, in_crement } from '../firebase/utils/fireRealTimeDatabase';

interface ILetterCard {
    coinId: string;
    letter: string;
    count: number;
    isStatic?: boolean;
}

export const LetterCard = ({ coinId, letter, count, isStatic=false }: ILetterCard) => {
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
            <Collapse in={open && !isStatic}>
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
