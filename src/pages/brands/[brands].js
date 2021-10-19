import React from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import { fetcher, __ } from "../../utils";
import RelationSlider from "../../components/RelationSlider";
import FullPage from "../../components/FullPage";
import BrandDetail from "./details";
import Products from "./products";
import ProductDetail from "./productDetail";
import ProductModal from "./productModal";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

class Brands extends React.Component {
  static async getInitialProps(ctx) {
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

    const posts = await fetcher(
      `${Config.apiUrl}/wp/v2/posts?_embed&per_page=100&${
        lang === "mn" ? "lang=mn" : "lang="
      }`
    );

    return { items, categories, posts, lang };
  }

  constructor({ items, categories, posts, lang }) {
    super({ items, categories, posts, lang });

    this.state = {
      showDetail: false,
      showProduct: false,
      showProductDetail: false,
      currentProduct: "",
      currentProductDetail: "",
      productDetail: "",
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

  onProductClick = (currentProductDetail) => {
    this.setState({ showProductDetail: true }, () => {
      if (this.state.showProductDetail) {
        window.fullpage_api.moveTo(4, 0);
        this.setState({ currentProductDetail });
      }
    });
  };

  onDetailClick = (productDetail) => {
    if (productDetail.count !== 0) {
      this.setState({ showDetail: true }, () => {
        if (this.state.showDetail) {
          window.fullpage_api.moveTo(5, 0);
          this.setState({ productDetail });
        }
      });
    }
  };

  render() {
    const { items, posts, categories } = this.props;

    const {
      showProduct,
      currentProduct,
      currentProductDetail,
      showProductDetail,
      showDetail,
      productDetail,
    } = this.state;

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
            <div id="fullpage">
              <div className="section brand-detail item-detail">
                <BrandDetail items={items} />
              </div>
              <div className="section odd">
                <div
                  className={
                    "brandsProducts relative px-40 h-body flex flex-col justify-center 2xl:px-20 xl:px-16 lg:px-16 md:px-10 sm:p-5 md:h-auto sm:h-auto lg:h-auto lg:py-10 md:py-5 sm:py-5"
                  }
                >
                  <div className="flex items-center justify-between sm:block sm:leading-8">
                    <h2 className="text-menuTextColor xl:m-0 mr-5 sm:mb-5">
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: brand.title.rendered,
                        }}
                      />
                      &nbsp;
                      {__("Products")}
                    </h2>
                    {brand.acf && brand.acf.brochure && (
                      <a
                        className="flex items-center text-blue-600 font-medium"
                        href={brand.acf.brochure}
                        target="_blank"
                        download
                      >
                        <Button
                          type="primary"
                          shape="round"
                          icon={<DownloadOutlined />}
                        >
                          {__("Download brochure")}
                        </Button>
                      </a>
                    )}
                  </div>
                  <Products items={categories} onClick={this.onClick} />
                </div>
              </div>

              {showProduct && (
                <div className="section" id="content">
                  <div
                    className={
                      "brandsProducts relative px-40 h-body flex flex-col justify-center 2xl:px-20 xl:px-16 lg:px-16 md:pr-8 md:pl-24 sm:px-5 lg:h-auto md:h-auto sm:h-auto lg:py-10 md:py-5 sm:py-5"
                    }
                  >
                    <div className="flex items-center justify-between mb-8 2xl:mb-5 xl:mb-5 sm:block sm:leading-8">
                      <h2 className="text-menuTextColor mr-5 sm:mb-5">
                        <div
                          className="inline-block"
                          dangerouslySetInnerHTML={{
                            __html: currentProduct.name,
                          }}
                        />
                        &nbsp;
                        {__("Products")}
                      </h2>
                      {currentProduct.acf && currentProduct.acf.pdf_file && (
                        <a
                          className="flex items-center text-blue-600 font-medium"
                          href={currentProduct.acf.pdf_file}
                          target="_blank"
                          download
                        >
                          <Button
                            type="primary"
                            shape="round"
                            icon={<DownloadOutlined />}
                          >
                            {__("Download brochure")}
                          </Button>
                        </a>
                      )}
                    </div>
                    <div className="xl:h-80 xl:overflow-auto">
                      <ProductDetail
                        currentItemId={currentProduct.id}
                        onClick={this.onProductClick}
                      />
                    </div>
                  </div>
                </div>
              )}

              {showProductDetail && (
                <div className="section" id="content">
                  <div
                    className={
                      "brandsProducts relative px-40 h-body justify-center flex flex-col xl:px-16 md:pl-24 md:pr-8 sm:px-5 lg:px-16 2xl:px-20 lg:h-auto md:h-auto sm:h-auto lg:py-10 md:py-5 sm:py-5"
                    }
                  >
                    <div className="flex items-center justify-between mb-8 sm:block">
                      <h2 className="text-menuTextColor mr-5 sm:leading-8">
                        <div
                          className="inline-block"
                          dangerouslySetInnerHTML={{
                            __html: currentProductDetail.name,
                          }}
                        />
                        &nbsp;
                        {__("Products")}
                      </h2>
                      {currentProductDetail.acf &&
                        currentProductDetail.acf.pdf_file && (
                          <a
                            className="flex items-center text-blue-600 font-medium"
                            href={currentProductDetail.acf.pdf_file}
                            target="_blank"
                            download
                          >
                            <Button
                              type="primary"
                              shape="round"
                              icon={<DownloadOutlined />}
                            >
                              {__("Download brochure")}
                            </Button>
                          </a>
                        )}
                    </div>
                    <div className="xl:h-80 xl:overflow-auto">
                      <ProductDetail
                        currentItemId={currentProductDetail.id}
                        onClick={this.onDetailClick}
                      />
                    </div>
                  </div>
                </div>
              )}

              {showDetail && (
                <div className="section odd" id="content">
                  <div
                    className={
                      "brandsProducts relative px-40 flex flex-col h-body justify-center lg:px-16 md:px-14 sm:px-8 2xl:px-20 xl:px-16 lg:h-auto md:h-auto sm:h-auto lg:py-10 md:py-5 sm:py-5"
                    }
                  >
                    <h2 className="text-menuTextColor mb-8 sm:leading-8">
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: productDetail.name,
                        }}
                      />
                      &nbsp;
                      {__("Products")}
                    </h2>
                    <ProductModal currentItemId={productDetail.id} />
                  </div>
                </div>
              )}

              {hasRelation && (
                <div className="section category-brand">
                  <div className="px-40 relative bg-white lg:px-16 h-body justify-center flex flex-col 2xl:px-20 xl:px-16 lg:h-auto md:h-auto sm:h-auto lg:py-10 md:py-5 sm:py-5">
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

export default Brands;
