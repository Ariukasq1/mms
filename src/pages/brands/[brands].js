import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import mainStore from "../../stores";
import arrow from "../../public/images/arrow.svg";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import ReactFullpage from "../../lib/fullpage";
import {
  fetcher,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
} from "../../utils";
import RelationSlider from "../../components/RelationSlider";

class Brands extends React.Component {
  render() {
    const settingsProductItems = {
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      rows: 2,
      autoplay: false,
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
    const { language } = mainStore;
    const { products, items, posts } = this.props;
    const brand = items ? items[0] : {};
    const { logo, about, what_we_offer_with, capabilities, industries } =
      brand.acf || {};

    const hasRelation =
      (capabilities || []).length !== 0 || (industries || []).length !== 0
        ? true
        : false;

    const renderRelations = (title, items) => {
      return (
        <div>
          <h4 className="mb-20 font-semibold text-xl capitalize">{title}</h4>
          <RelationSlider items={items} querySlug={title} posts={posts} />
        </div>
      );
    };

    const renderProducts = products.map((product, index) => (
      <div key={index} className="brand-p-item mb-20">
        <Link href={`/brands/${product.slug}?lang=${language}`} passHref>
          <a>
            <div className="font-medium text-black text-xl mb-4 title">
              {product.title.rendered}
            </div>
            <div className="image-wrapper">
              <img src={getData(product._embedded, "image")} />
            </div>
          </a>
        </Link>
      </div>
    ));

    return (
      <Layout>
        <ReactFullpage
          navigationPosition={"left"}
          paddingTop={"116px"}
          navigation
          render={({ state, fullpageApi }) => {
            return (
              <div id="fullpage">
                <div className="section">
                  <div
                    className="brand-detail pr-32 xl:pr-10 xl:pl-24 lg:pr-10 lg:pl-24 md:pl-24 md:pr-4 sm:px-16 sm:pr-8 bg-white"
                    style={{ flexBasis: "50%", paddingLeft: "14rem" }}
                  >
                    <div className={"mb-8"}>
                      <img src={logo && logo.url} alt="brand-logo" />
                    </div>

                    <div
                      className={
                        "itemDetails flex flex-row items-center justify-between md:flex-col sm:flex-col"
                      }
                    >
                      <div
                        className={
                          "itemDetailsTexts w-1/3 mr-16 md:w-full md:pl-10 md:pb-10 xl:pl-24 sm:px-12 sm:w-full"
                        }
                      >
                        <img src={getData(brand._embedded, "image")} />
                      </div>
                      <div className="w-2/3 relative md:w-full sm:w-full auto-overflow">
                        <div className={"itemDetailsTexts pr-24"}>
                          <h3 className="mb-10">
                            About <span> {brand.title.rendered}</span>{" "}
                          </h3>
                          <div
                            className={"text-lg pb-10"}
                            dangerouslySetInnerHTML={{
                              __html: about,
                            }}
                          />
                        </div>
                        <div className={"itemDetailsImages"}>
                          <h3 className="mb-10">
                            What WE offer with{" "}
                            <span> {brand.title.rendered}</span>
                          </h3>
                          <div
                            className={"text-lg pb-10"}
                            dangerouslySetInnerHTML={{
                              __html: what_we_offer_with,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section odd">
                  <div className={"brandsProducts px-40 flex flex-col"}>
                    <h2>{brand.title.rendered} products</h2>
                    <Slider {...settingsProductItems}>{renderProducts}</Slider>
                  </div>
                </div>

                {hasRelation && (
                  <div className="section category-brand">
                    <div className="px-40 bg-white">
                      {(capabilities || []).length !== 0 &&
                        renderRelations("capabilities", capabilities)}
                      {(industries || []).length !== 0 &&
                        renderRelations("industries", industries)}
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        />
      </Layout>
    );
  }
}

Brands.getInitialProps = async (ctx) => {
  const query = ctx.query.brands;
  const lang = ctx.query.lang;

  const items = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${query}&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const products = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=175&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const posts = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&per_page=100&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  return { items, products, posts };
};

export default Brands;
