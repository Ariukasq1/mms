import React from "react";
import Layout from "../components/layouts/Layout";
import ReactFullpage from "../lib/fullpage";
import { Config } from "../config";
import HomeSlider from "../components/layouts/HomeSlider";
import CapabilitiesComponent from "../components/CapabilitiesComponent";
import IndustryComponent from "../components/IndustryComponent";
import ShowRoomComponent from "../components/ShowRoomComponent";
import BrandsComponent from "../components/BrandsComponent";
import { fetcher } from "../utils";

const Index = ({ sliders, home_screen_items, brands, brandCategories }) => {
  const anchors = ["section1", "section2", "section3", "section4", "section5"];
  let capabilities;
  let industry;
  let showroom;

  home_screen_items.filter(function (item) {
    switch (item.slug) {
      case "capabilities":
        capabilities = item;
        break;
      case "industries":
        industry = item;
        break;
      case "showroom":
        showroom = item;
        break;
    }
  });

  return (
    <Layout>
      <div className="relative">
        <ReactFullpage
          anchors={anchors}
          navigationPosition={"left"}
          navigation
          paddingTop={"116px"}
          scrollOverflow={true}
          onLeave={(origin, destination, direction) => {}}
          render={({ state, fullpageApi }) => {
            return (
              <div id="fullpage homeScreen">
                <div className="section slider">
                  <HomeSlider sliders={sliders} />
                </div>
                <div className="section capabilities">
                  <CapabilitiesComponent data={capabilities} />
                </div>
                <div className="section industry">
                  <IndustryComponent data={industry} />
                </div>
                <div className="section showroom">
                  <ShowRoomComponent data={showroom} />
                </div>
                <div className="section brands bg-white">
                  <div className="ml-32">
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
};

Index.getInitialProps = async (ctx) => {
  const query = ctx.query.lang;

  const sliders = await fetcher(
    `${Config.apiUrl}/wp/v2/sliders${query === "mn" ? "?lang=" + query : ""}`
  );

  const home_screen_items = await fetcher(
    `${Config.apiUrl}/wp/v2/home_screen_items${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

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

  return { sliders, query, home_screen_items, brandCategories, brands };
};

export default Index;
