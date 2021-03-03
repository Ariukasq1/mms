import React from "react";
import Layout from "../../components/layouts/Layout";
import BrandsComponent from "../../components/BrandsComponent";
import { Config } from "../../config";
import ReactFullpage from "../../lib/fullpage";
import { fetcher } from "../../utils";

class Brands extends React.Component {
  render() {
    const { brands, brandCategories } = this.props;
    const anchors = ["1", "2", "3"];

    return (
      <Layout>
        <div className="relative">
          <ReactFullpage
            anchors={anchors}
            navigationPosition={"left"}
            navigation
            scrollOverflow={true}
            paddingTop={"116px"}
            render={({ state, fullpageApi }) => {
              return (
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
              );
            }}
          />
        </div>
      </Layout>
    );
  }
}

Brands.getInitialProps = async (ctx) => {
  const query = ctx.query.lang;

  const brandCategories = await fetcher(
    `${Config.apiUrl}/wp/v2/categories?parent=112&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

  const brands = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=112&per_page=100&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

  return { brands, brandCategories };
};
export default Brands;
