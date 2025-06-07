import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import CarouselComponent from '../components/Carousel/Carousel';
import '../App.css';
import CountryCard from '../components/CountryCard';
import { useAppDispatch, useAppSelector } from '../hook';
import { setRegion, loadMore, fetchCountries } from '../redux/slice/countrySlice';
import Footer from '../components/Footer';

const Home = () => {
    const dispatch = useAppDispatch();
    const {
        filteredCountries,
        status,
        page,
        itemsPerPage,
        selectedRegion,
    } = useAppSelector((state) => state.countries);

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    const handleRegionChange = (region: string) => {
        dispatch(setRegion(region));
    };

    const handleLoadMore = () => {
        dispatch(loadMore());
    };

    const displayedCountries = filteredCountries.slice(0, page * itemsPerPage);

    return (
        <Container fluid className="px-4 py-3">
            <Navbar selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />

          
            <Row className="mt-4">
              
                <Col lg={4} md={5} className="order-1 order-lg-2 ps-lg-3 mb-4 mb-lg-0">
                    <div
                        className="border h-100 d-flex justify-content-center align-items-center"
                        style={{
                            minHeight: '400px',
                            backgroundColor: '#f8f9fa'
                        }}
                    >
                        <div className="text-center">
                            <div
                                className="mx-auto mb-3 d-flex justify-content-center align-items-center border"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: '#e9ecef',
                                    border: '2px solid #dee2e6'
                                }}
                            >
                                <div
                                    className="d-flex justify-content-center align-items-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#6c757d',
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

              
                <Col lg={8} md={7} className="order-2 order-lg-1 pe-lg-3">
                    <div className="carousel-container">
                        <CarouselComponent />
                    </div>
                </Col>
            </Row>

         
            <div className='mt-5'>
                {status === 'loading' && <p>Loading countries...</p>}
                {status === 'failed' && <p>Error loading countries</p>}
                {status === 'succeeded' && (
                    <CountryCard countries={displayedCountries} />
                )}
            </div>

            {filteredCountries.length > displayedCountries.length && (
                <div className="text-center">
                    <Button
                        style={{ borderRadius: 0 }}
                        variant="dark"
                        className="mt-5 px-4"
                        onClick={handleLoadMore}
                    >
                        Load more
                    </Button>
                </div>
            )}

            <div className='mt-5'>
                <Footer />
            </div>
        </Container>
    );
};

export default Home;