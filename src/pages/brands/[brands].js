import React from "react";
import Slider from "react-slick";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import ReactFullpage from "../../lib/fullpage";
import {
  fetcher,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
  __,
} from "../../utils";
import RelationSlider from "../../components/RelationSlider";

class Brands extends React.Component {
  renderBrandDetail(items) {
    const brand = items ? items[0] : {};
    const {
      logo,
      about,
      brochure,
      slogan,
      country,
      founded_year,
      advantage,
      additional,
      certificate,
    } = brand.acf || {};

    return (
      <div className="brand-detail h-full px-32 xl:pr-10 xl:pl-24 lg:pr-10 lg:pl-24 md:pl-24 md:pr-4 sm:px-16 sm:pr-8 bg-white">
        <div className="grid h-full grid-cols-3 gap-1">
          <div className="col-item pt-28 pr-8 pb-6 pl-6">
            <div className={"itemDetailsTexts"}>
              <h3 className="mb-10 text-menuTextColor leading-8 font-bold text-2xl">
                {__("About")}{" "}
                <span>
                  {" "}
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{ __html: brand.title.rendered }}
                  />
                </span>{" "}
              </h3>
              <div
                className={"text-lg pb-10 auto-overflow"}
                dangerouslySetInnerHTML={{
                  __html: about,
                }}
              />
            </div>
          </div>
          <div className="col-item bg p-10 text-center">
            <div className={"mb-6 logo flex justify-center"}>
              <img src={logo && logo} alt="brand-logo" />
            </div>
            <div className="slogan">
              {slogan && (
                <div className="slo text-2xl font-semibold mb-6">
                  "{slogan}"
                </div>
              )}
              <div className="flex flex-col">
                {country && (
                  <div className="text self-center relative text-lg font-medium uppercase country">
                    <i>
                      {__("Country")}: {country}
                    </i>
                  </div>
                )}
                {founded_year && (
                  <div className="text self-center relative text-lg font-medium uppercase year mb-6">
                    <i>
                      {__("Founded year")}: {founded_year}
                    </i>
                  </div>
                )}
              </div>
            </div>
            <div className="featured-image flex justify-center mb-8">
              <img src={getData(brand._embedded, "image")} />
            </div>
            {certificate && (
              <div className="certification">
                <div className="text-base font-medium mb-3">
                  {__("Certification & Accreditations:")}
                </div>
                <img className="w-full" src={certificate} alt="certificate" />
              </div>
            )}
          </div>
          <div className="col-item pt-28 pr-6 pb-6 pl-16">
            <div className={"itemDetailsTexts"}>
              <h3 className="mb-10 text-menuTextColor leading-8 font-bold text-2xl">
                <span>
                  {" "}
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{ __html: brand.title.rendered }}
                  />
                </span>{" "}
                {__("Details")}
              </h3>
              <div
                className={"text-lg pb-10 auto-overflow"}
                dangerouslySetInnerHTML={{
                  __html: advantage,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderProducts(selectedBrandId) {
    const { products } = this.props;

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

    const content = products.map((product, index) => {
      if (product.id === selectedBrandId) {
        return null;
      }

      return (
        <div key={index} className="brand-p-item mb-20">
          <div className="font-medium text-black text-xl mb-4 title">
            <div dangerouslySetInnerHTML={{ __html: product.title.rendered }} />
          </div>
          <div className="image-wrapper">
            <img src={getData(product._embedded, "image")} />
          </div>
        </div>
      );
    });

    if (products.length > 8) {
      return <Slider {...settingsProductItems}>{content}</Slider>;
    }

    return <div class="grid grid-cols-4 gap-6">{content}</div>;
  }

  render() {
    const { items, posts } = this.props;
    const brand = items ? items[0] : {};
    const { capabilities, industries } = brand.acf || {};

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

    return (
      <Layout>
        <ReactFullpage
          navigationPosition={"left"}
          paddingTop={"116px"}
          navigation
          render={({ state, fullpageApi }) => {
            return (
              <div id="fullpage brand-component">
                <div className="section">{this.renderBrandDetail(items)}</div>
                <div className="section odd">
                  <div className={"brandsProducts px-40 flex flex-col"}>
                    <h2 className="text-menuTextColor">
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: brand.title.rendered,
                        }}
                      />{" "}
                      products
                    </h2>
                    {this.renderProducts(brand.id)}
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
      lang === "mn" ? "lang=mn" : "lang="
    }`
  );

  const catId = items.length !== 0 ? items[0].categories[0] : 173;

  const products = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=${catId}&${
      lang === "mn" ? "lang=mn" : "lang="
    }`
  );

  const posts = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&per_page=100&${
      lang === "mn" ? "lang=mn" : "lang="
    }`
  );

  return { items, products, posts };
};

export default Brands;
