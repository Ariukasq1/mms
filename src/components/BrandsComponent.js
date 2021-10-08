import React from "react";
import Slider from "react-slick";
import arrow from "../public/images/arrow-blue.svg";
import Link from "next/link";
import { getData, sliderSettings, __, getLangParam } from "../utils";

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
    const currentLanguage = getLangParam();
    const { filteredBrands } = this.state;

    const content = filteredBrands.map((brand, index) => {
      const { logo } = brand.acf || {};

      return (
        <div key={index} className="single-brand sm:mb-10">
          <div className="logo-wrapper h-16 w-64 xl:h-10 xl:w-40 lg:h-10 lg:w-40 2xl:w-40 2xl:h-12">
            <img src={logo} className="object-contain h-full" alt="logo" />
          </div>
          <Link href={`/brands/${brand.slug}?lang=${currentLanguage}`} passHref>
            <div style={{ display: "block" }}>
              <div style={{ display: "flex" }}>
                <a
                  className="my-4 text-base w-auto text-gradient font-normal hover:text-opacity-100 flex flex-row sm:my-1"
                  style={{ display: "block" }}
                >
                  {__("Read more")}
                </a>
                <img className="object-contain w-10 ml-4" src={arrow} />
              </div>
              <div className="bg-img-wrapper h-72 w-full xl:h-32 2xl:h-56 lg:h-32">
                <img
                  src={getData(brand._embedded, "image")}
                  className="object-cover h-full w-full"
                  alt={logo.name}
                />
              </div>
            </div>
          </Link>
        </div>
      );
    });

    if (filteredBrands.length >= 5) {
      return <Slider {...sliderSettings}>{content}</Slider>;
    }

    return (
      <div className="grid grid-cols-4 gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {content}
      </div>
    );
  }

  render() {
    const { brandCategories } = this.props;
    const { brandId } = this.state;

    const categories = (
      <ul className="flex justify-center category-wrapper mb-20 xl:mb-5 sm:mb-5 sm:justify-start sm:text-left 2xl:mb-5 lg:mb-2 lg:pl-0 md:mb-2">
        <li
          className={`text-base font-medium py-2 px-3 sm:pl-0 list-none ${
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
              className={`text-base font-medium p-2 sm:pl-0 xl:text-sm list-none ${
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
      <div className="justify-start items-start brands pl-32 pr-16 sm:px-2 lg:px-16 overflow-auto md:px-5 h-body sm:h-auto">
        <div className="text-center sm:text-left">
          <div className="heading-tag capitalize text-xl font-bold sm:text-lg sm:ml-5">
            {__("Brands")}
          </div>
          <div className="heading-title capitalize text-5xl mt-2 mb-6 xl:text-4xl sm:text-2xl sm:leading-7 sm:my-4 sm:font-semibold sm:ml-5">
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
