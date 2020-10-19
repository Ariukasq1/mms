import React from "react";
import Slider from "react-slick";
import arrow from "../public/images/arrow.svg";
import mainStore from "../stores";
import Link from "next/link";
import { getData } from "../utils";

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

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 3000,
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

class BrandsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { brandId: 0, filteredBrands: this.props.brands };
  }

  filterBrand = (brandId) => {
    const { brands } = this.props;

    this.setState({ brandId }, () => {
      if (brandId !== 0) {
        this.setState({
          filteredBrands: brands.filter((brand) =>
            brand.categories.includes(brandId)
          ),
        });
      } else {
        this.setState({ filteredBrands: brands });
      }
    });
  };

  renderBrands() {
    const { language } = mainStore;
    const { filteredBrands } = this.state;

    return filteredBrands.map((brand, index) => {
      const { logo } = brand.acf || {};

      return (
        <div className="single-brand" key={index}>
          <div className="logo-wrapper">
            <img
              src={logo.url}
              className="object-contain h-full"
              alt={logo.name}
            />
          </div>
          <Link href={`/brands/${brand.slug}?lang=${language}`} passHref>
            <a className="more flex">
              Read more
              <img className="object-contain ml-4" src={arrow} />
            </a>
          </Link>
          <div className="bg-img-wrapper">
            <img
              src={getData(brand._embedded, "image")}
              className="object-cover h-full"
              alt={logo.name}
            />
          </div>
        </div>
      );
    });
  }

  render() {
    const { brandCategories } = this.props;
    const { brandId } = this.state;

    const instance = (
      <ul className="flex category-wrapper mb-40">
        <li
          className={brandId === 0 ? "active" : null}
          onClick={this.filterBrand.bind(this, 0)}
          href="/brands?lang=en"
        >
          #All brands
        </li>
        {brandCategories.map((category) => (
          <li
            key={category.id}
            className={brandId === category.id ? "active" : null}
            onClick={this.filterBrand.bind(this, category.id)}
          >
            #{category.name}
          </li>
        ))}
      </ul>
    );

    return (
      <div
        className="justify-start items-start brands sm:ml-10 sm:mr-4"
        style={{ backgroundColor: "white" }}
      >
        <div className="header">
          <h2>Brands</h2>
          {instance}
        </div>
        <Slider {...settings} className="h-full">
          {this.renderBrands()}
        </Slider>
      </div>
    );
  }
}

export default BrandsComponent;
