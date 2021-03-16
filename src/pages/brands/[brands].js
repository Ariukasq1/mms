import React from "react";
import { PictureOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import {
  fetcher,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
  __,
} from "../../utils";
import RelationSlider from "../../components/RelationSlider";
import FullPage from "../../components/FullPage";
import BrandDetail from "./details";
import Products from "./products";
import ProductDetail from "./productDetail";

class Brands extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showProduct: false,
      currentProduct: "",
    };
  }

  onClick = (currentProduct) => {
    this.setState({ showProduct: true }, () => {
      if (this.state.showProduct) {
        window.fullpage_api.moveTo(3, 0);
        this.setState({ currentProduct });
      }
    });
  };

  render() {
    const { items, posts, categories } = this.props;
    const { showProduct, currentProduct } = this.state;
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
        <FullPage
          children={
            <div id="fullpage brand-component">
              <div className="section brand-detail item-detail">
                <BrandDetail items={items} />
              </div>
              <div className="section odd">
                <div className={"brandsProducts px-40 flex flex-col"}>
                  <h2 className="text-menuTextColor">
                    <div
                      className="inline-block"
                      dangerouslySetInnerHTML={{
                        __html: brand.title.rendered,
                      }}
                    />
                    &nbsp;
                    {__("Products")}
                  </h2>
                  <Products items={categories} onClick={this.onClick} />
                </div>
              </div>
              {showProduct && (
                <div className="section" id="content">
                  <div className={"brandsProducts px-40 flex flex-col"}>
                    <h2 className="text-menuTextColor">
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: currentProduct.name,
                        }}
                      />
                      &nbsp;
                      {__("Products")}
                    </h2>
                    <ProductDetail currentItemId={currentProduct.id} />
                  </div>
                </div>
              )}

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
          }
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

  const itemSlug = items.length !== 0 ? items[0].slug : "abb";

  const currentCat = await fetcher(
    `${Config.apiUrl}/wp/v2/categories?slug=${itemSlug}&${
      lang === "mn" ? "lang=mn" : "lang="
    }`
  );

  const categories = await fetcher(
    `${Config.apiUrl}/wp/v2/categories?parent=${currentCat[0].id || "222"}&${
      lang === "mn" ? "lang=mn" : "lang="
    }`
  );

  const products = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=113&${
      lang === "mn" ? "lang=mn" : "lang="
    }`
  );

  const posts = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&per_page=100&${
      lang === "mn" ? "lang=mn" : "lang="
    }`
  );

  return { items, products, categories, posts, lang };
};

export default Brands;
