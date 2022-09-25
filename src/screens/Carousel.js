import React from "react";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../utils/banner1.png";
import banner2 from "../utils/banner2.png";
import banner3 from "../utils/banner3.png";

const Carousel1 = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={banner1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={banner2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={banner3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousel1;
