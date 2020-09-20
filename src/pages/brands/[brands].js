import React from "react";
import BrandsComponent from "../../components/BrandsComponent";
import { configureLanguage } from "../../utils/language";
import { Config } from "../../config";
import axios from "axios";
import Slider from "react-slick";
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";

const styles = {
  width: 320,
  height: 209 
}

class Brands extends React.Component {
  render() {
    const settingsProductItems = {
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: true,
    };
    const { brand, subcategory } = this.props;
    console.log(subcategory)
    const renderBrandItems = subcategory.products.map((product, index) => (
      <div key={index} className={"h-64"} style={{margin: "0 auto", width: "99%", height: "500px"}}>
        <div className={"font-medium text-black text-xl mb-4"}>
          {product.product_name}
        </div>
        <div>
          <img style={styles} src={product.product_image.url} />
        </div>
      </div>
    ));
    return (
      <Layout>
        <ReactFullpage
          paddingTop={"116px"}
          scrollOverflow={false}
          onLeave={(origin, destination, direction) => {}}
          render={({ state, fullpageApi }) => {
            return (
              <div id="fullpage">
                <div className="section">
                  <div
                    className={
                      "itemDetails flex flex-row items-center justify-between md:flex-col sm:flex-col"
                    }
                  >
                    <div
                      className={
                        "itemDetailsTexts w-1/2 pl-48 pr-24 md:w-full md:pl-10 md:pb-10 xl:pl-24 sm:px-12 sm:w-full"
                      }
                    >
                      <div style={{ paddingTop: "116px" }}>
                        <div className={"mb-8"}>
                          <img src={brand[0].brand_image.url} />
                        </div>
                        <div
                          className={"text-lg pb-10"}
                          dangerouslySetInnerHTML={{
                            __html: brand[0].products.map(
                              (product) => product.product_about
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className={
                        "itemDetailsImages w-1/2 relative md:w-full sm:w-full"
                      }
                    >
                      <div>
                        <img
                          src={brand[0].brand_thumbnail.url}
                          className={
                            "object-contain object-center h-body w-full"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div className={"brandsProducts px-40 flex flex-col"} >
                    <div className={"self-end mb-10 flex flex-row"}>
                      <img src={subcategory.brand_image.url} />
                    </div>
                    <Slider {...settingsProductItems}>
                      {renderBrandItems}
                    </Slider>
                  </div>
                </div>
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
  const itemQuery = ctx.query.brands;
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const brands = await fetcher(
    `${Config.apiUrl}/wp/v2/navigation_menus?slug=brands&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );
  const items = brands[0].acf.brands;
  let brand = [];
  items.map((data) => {
    if (data.slug === query) {
      brand.push(data);
    }
  });

  let subcategory;
  brands[0].acf.brands.forEach((el) => {
    if (el.slug === itemQuery) {
      subcategory = el;
      return;
    } else {
      if (ctx.res) {
        ctx.res.statusCode = 404;
      }
    }
  });

  return { brand, subcategory };
};

export default Brands;
