import React from "react";
import WPAPI from "wpapi";
import Slider from "react-slick";
import arrow from "../public/images/arrow.svg";
import mainStore from "../stores";
import Link from "next/link";
import { getData, sliderSettings, fetcher } from "../utils";
import { Config } from "../config";

const wp = new WPAPI({ endpoint: Config.apiUrl });

class RelationSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: {},
    };
  }

  componentDidMount() {
    wp.posts()
      .id(970)
      .embed()
      .then((data) => {
        this.setState({ brand: data });
      })
      .catch((err) => console.log(err));
  }

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
    const { item } = this.props;

    return (
      <div className="justify-start items-start brands sm:ml-10 sm:mr-4">
        {/* <div className="header">
          <h2>Brands</h2>
          {instance}
        </div>
        <Slider {...sliderSettings} className="h-full">
          {this.renderBrands()}
        </Slider> */}
      </div>
    );
  }
}

RelationSlider.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&id=${ctx.query}&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  return { detail };
};

export default RelationSlider;
