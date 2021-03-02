import React from "react";
import Slider from "react-slick";
import arrow from "../public/images/arrow.svg";
import mainStore from "../stores";
import Link from "next/link";
import { getData, sliderSettings } from "../utils";

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
          <div className="flex">
            <div>#</div>All brands
          </div>
        </li>
        {brandCategories.map((category) => (
          <li
            key={category.id}
            className={brandId === category.id ? "active" : null}
            onClick={this.filterBrand.bind(this, category.id)}
          >
            <div className="flex">
              <div>#</div>
              {category.name}
            </div>
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
        <Slider {...sliderSettings} className="h-full">
          {this.renderBrands()}
        </Slider>
      </div>
    );
  }
}

export default BrandsComponent;
