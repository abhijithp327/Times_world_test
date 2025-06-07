import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

interface Country {
    name: string;
    region: string;
    flag: string; 
}

interface CountryCardProps {
    countries: Country[];
}

const CountryCard: React.FC<CountryCardProps> = ({ countries }) => {


    return (

        <Container fluid>
            <Row className="g-3">
                {countries.map((country) => (
                    <Col key={country.name} xs={12} sm={6} md={6} lg={6} xl={6}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex gap-2">

                                <Image
                                    src={country.flag}
                                    alt={country.name}
                                    className="me-2"
                                    style={{ width: '127px', height: '96px' }}
                                />

                                <div className='d-flex flex-column '>
                                    <h4 className='fs-5'>{country.name}</h4>
                                    <p>{country.region}</p>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CountryCard;