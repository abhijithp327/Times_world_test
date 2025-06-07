import { Carousel } from 'react-bootstrap';
import './CarouselComponent.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Country {
  name: string;
  flag: string;
  capital?: string;
  population?: number;
}

const CarouselComponent = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all?fields=name,flag,capital,population');
        // Get 5 random countries for the carousel
        const randomCountries = response.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setCountries(randomCountries);
      } catch (err) {
        setError('Failed to fetch countries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  if (loading) return <div className="text-center py-5">Loading carousel...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  if (countries.length === 0) return <div className="text-center py-5">No countries available</div>;

  return (
    <div className="carousel-container">
      <Carousel 
        indicators={true}
        controls={true}
        fade={false}
        interval={3000}
        className="custom-carousel"
      >
        {countries.map((country) => (
          <Carousel.Item key={country.name}>
            <div 
              className="d-flex justify-content-center align-items-center"
              style={{ 
                height: '400px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <div className="text-center p-4">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="mb-3"
                  style={{
                    width: '200px',
                    height: '120px',
                    objectFit: 'cover',
                    border: '2px solid #dee2e6'
                  }}
                />
                
                <h3 className="mb-2">{country.name}</h3>
                
                {country.capital && (
                  <p className="mb-1">
                    <strong>Capital:</strong> {country.capital}
                  </p>
                )}
                
                {country.population && (
                  <p className="mb-0">
                    <strong>Population:</strong> {country.population.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;