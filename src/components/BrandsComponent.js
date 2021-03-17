import React from "react";
import Slider from "react-slick";
import arrow from "../public/images/arrow-blue.svg";
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
        <div key={index} className="single-brand">
          <div className="logo-wrapper">
            <img src={logo} className="object-contain h-full" alt="logo" />
          </div>
          <Link href={`/brands/${brand.slug}?lang=${language}`} passHref>
            <a className="my-4 text-base w-auto text-gradient font-normal hover:text-opacity-100 flex flex-row sm:my-4">
              {__("Read more")}
              <img className="object-contain w-10 ml-4" src={arrow} />
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

    return <div className="grid grid-cols-4 gap-6">{content}</div>;
  }

  render() {
    const { brandCategories } = this.props;
    const { brandId } = this.state;

    const categories = (
      <ul className="flex justify-center category-wrapper mb-20">
        <li
          className={`text-base font-medium py-2 px-3 ${
            brandId === 0 ? "active" : ""
          }`}
          onClick={this.filterBrand.bind(this, 0)}
          href="/brands?lang=en"
        >
          {__("All brands")}
        </li>
        <span className="py-2 font-bold">/</span>
        {brandCategories.map((category) => (
          <React.Fragment key={category.id}>
            <li
              key={category.id}
              className={`text-base font-medium p-2 ${
                brandId === category.id ? "active" : ""
              }`}
              onClick={this.filterBrand.bind(this, category.id)}
            >
              {category.name}
            </li>
            <span className="py-2 font-bold">/</span>
          </React.Fragment>
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
