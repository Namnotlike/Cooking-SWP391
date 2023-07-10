'use client';
import Carousel from 'react-bootstrap/Carousel';

const CarouselBanner = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="materials/carousel_01.svg"
          alt="First slide"
        />
        <Carousel.Caption>
          <div className='d-none d-sm-block'>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="materials/carousel_02.svg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <div className='d-none d-sm-block'>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="materials/carousel_03.svg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <div className='d-none d-sm-block'>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselBanner;