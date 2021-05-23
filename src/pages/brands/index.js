import React from "react";
import Layout from "../../components/layouts/Layout";
import BrandsComponent from "../../components/BrandsComponent";
import { Config } from "../../config";
import { fetcher } from "../../utils";
import FullPage from "../../components/FullPage";

class Brands extends React.Component {
  render() {
    const { brands, brandCategories } = this.props;

    return (
      <Layout>
        <div className="relative">
          <FullPage
            children={
              <div id="fullpage">
                <div className="section">
                  <div style={{ width: "85%", margin: "0 auto" }}>
                    <BrandsComponent
                      brands={brands}
                      brandCategories={brandCategories}
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </Layout>
    );
  }
}

Brands.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;

  const brandCategories = await fetcher(
    `${Config.apiUrl}/wp/v2/categories?parent=112&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const brands = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=112&per_page=80&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { brands, brandCategories };
};
export default Brands;
