import React from "react";
import Slider from "react-slick";
import arrow from "../public/images/arrow.svg";
import mainStore from "../stores";
import Link from "next/link";
import { getData, sliderSettings, __ } from "../utils";

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

    const content = filteredBrands.map((brand, index) => {
      const { logo } = brand.acf || {};

      return (
        <div className="single-brand" key={index}>
          <div className="logo-wrapper">
            <img src={logo} className="object-contain h-full" alt="logo" />
          </div>
          <Link href={`/brands/${brand.slug}?lang=${language}`} passHref>
            <a className="more text-base text-black font-normal flex">
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

    if (filteredBrands.length >= 5) {
      return (
        <Slider {...sliderSettings} className="h-full">
          {content}
        </Slider>
      );
    }

    return <div class="grid grid-cols-4 gap-6">{content}</div>;
  }

  render() {
    const { brandCategories } = this.props;
    const { brandId } = this.state;

    const categories = (
      <ul className="flex justify-center category-wrapper mb-20">
        <li
          className={`text-sm font-medium py-2 px-3 ${
            brandId === 0 ? "active" : ""
          }`}
          onClick={this.filterBrand.bind(this, 0)}
          href="/brands?lang=en"
        >
          {__("All brands")}
        </li>
        <span className="py-2 font-bold">/</span>
        {brandCategories.map((category) => (
          <>
            <li
              key={category.id}
              className={`text-sm font-medium p-2 ${
                brandId === category.id ? "active" : ""
              }`}
              onClick={this.filterBrand.bind(this, category.id)}
            >
              {category.name}
            </li>
            <span className="py-2 font-bold">/</span>
          </>
        ))}
      </ul>
    );

    return (
      <div
        className="justify-start items-start brands sm:ml-10 sm:mr-4"
        style={{ backgroundColor: "white" }}
      >
        <div className="text-center">
          <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
            {__("Brands")}
          </div>
          <div className="heading-title capitalize text-5xl mt-2 mb-6 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
            {__("Our products")}
          </div>
          {categories}
        </div>
        {this.renderBrands()}
      </div>
    );
  }
}

export default BrandsComponent;
