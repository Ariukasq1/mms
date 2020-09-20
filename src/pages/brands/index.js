import React from "react";
import Layout from "../../components/layouts/Layout";
import BrandsComponent from "../../components/BrandsComponent";
import { Config } from "../../config";
import axios from "axios";
import { configureLanguage } from "../../utils/language";
import mainStore from "../../stores";
import ReactFullpage from "../../lib/fullpage";
import RelativeCategory from "../../components/RelativeCategory";
import SliderSubCategories from "../../components/SliderSubCategories";
import ItemDetailsWithGallery from "../../components/ItemDetailsWithGallery";



class Brands extends React.Component {

  
  render() {
    const {brands} = this.props;
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
            onLeave={(origin, destination, direction) => {
            }}
            render={({ state, fullpageApi }) => {
              return(
                <div id="fullpage">
                  <div className={"section"}>
                    <div style={{width:"80%", margin: "0 auto"}}>
                      <BrandsComponent data={brands}/>
                    </div>
                  </div>
                </div>
              )
            }}
          />

        </div>
      </Layout>
    );
  }
}

Brands.getInitialProps = async (ctx) => {
  const language = configureLanguage(ctx);
  const query = ctx.query.lang;
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  
  const brands = await fetcher(
    `${Config.apiUrl}/wp/v2/navigation_menus?slug=brands&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

  
  return { brands };
};
export default Brands;
