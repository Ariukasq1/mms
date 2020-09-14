import React from "react";
import Slider from "react-slick";
import arrow from "../public/images/arrow.png";
import arrowImage from "../public/images/arrow.png";
import mainStore from "../stores";
import Link from "next/link";
import styled from "styled-components";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={arrow}
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={arrow}
      className={className}
      style={{ ...style, display: "block", transform: "rotate(180deg)" }}
      onClick={onClick}
    />
  );
}

function clickFilter(data, index) {
  if (index === 1) {
    return (
      <div key={index}>
        <div className="w-full h-48">
          <img
            src={brand.brand_thumbnail.url}
            className="object-cover h-full"
            alt={brand.brand_thumbnail.alt}
          />
        </div>
      </div>
    );
  }
}


function clicking(name){
  <Slider {...settings} className="h-full">
    {name}
  </Slider>
}
const BrandsComponent = ({ data }) => {
  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { language } = mainStore();
  const items = data[0].acf;


function clicking(){

  const clickFilter = items.brands.map((brand, index) => {
    if(brand.slug === "basheng"){
      return(
        <Slider {...settings} className="h-full">
        <div key={index}>
          <div className="w-full h-48">
          <img
            src={brand.brand_thumbnail.url}
            className="object-cover h-full"
            alt={brand.brand_thumbnail.alt}
          />
          </div>
        </div>
        </Slider>
      )
    }
  });
  
}
  const renderBrands = items.brands.map((brand, index) => {
    return (
      <div key={index}>
        <div className="w-auto h-12">
          <img
            src={brand.brand_image.url}
            className="object-contain h-full"
            alt={brand.brand_image.alt}
          />
        </div>
        <Link
          href={{
            pathname: `${data[0].slug}/${brand.slug}`,
            query: { lang: language },
          }}
        >
          <a className="my-8 text-lg w-auto bg-transparent text-black text-opacity-50 lowercase hover:text-opacity-100 hover:text-black flex flex-row sm:my-4">
            read more
            <img className="object-contain ml-4" src={arrowImage} />
          </a>
        </Link>
        <div className="w-full h-48">
          <img
            src={brand.brand_thumbnail.url}
            className="object-cover h-full"
            alt={brand.brand_thumbnail.alt}
          />
        </div>
      </div>
    );
  });
  return (
    <div className="justify-start items-start brands sm:ml-10 sm:mr-4">
      <div className="flex">
        <FilterWord onClick={clicking()}>#all brands</FilterWord>
        <FilterWord>#cable</FilterWord>
        <FilterWord>#connectors</FilterWord>
        <FilterWord>#tools</FilterWord>
      </div>
      <Slider {...settings} className="h-full">
        {renderBrands}
      </Slider>
    </div>
  );
};

export default BrandsComponent;

const FilterWord = styled.button`
  text-align: center;
  vertical-align: middle;
  margin-bottom: 100px;
  padding: 10px 50px 10px 50px;
  margin-left: 20px;
  color: black;

  :active {
    border: 2px solid #296d98;
  }
`;
