import React from "react";
import Layout from "../components/layouts/Layout";
import ReactFullpage from "../lib/fullpage";
import { Config } from "../config";
import HomeSlider from "../components/layouts/HomeSlider";
import CapabilitiesComponent from "../components/CapabilitiesComponent";
import IndustryComponent from "../components/IndustryComponent";
import BrandsComponent from "../components/BrandsComponent";
import { fetcher } from "../utils";
import FullPage from "../components/FullPage";

const Index = ({
  sliders,
  brands,
  brandCategories,
  capability,
  industries,
}) => {
  return (
    <Layout>
      <div className="relative">
        <FullPage
          children={
            <div id="fullpage homeScreen">
              <div className="section slider">
                <HomeSlider sliders={sliders} />
              </div>
              <div className="section capabilities">
                <CapabilitiesComponent data={capability[0]} />
              </div>
              <div className="section industry">
                <IndustryComponent industries={industries} />
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
          }
        />
      </div>
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  const query = ctx.query.lang;

  const sliders = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=215&filter[orderby]=id&order=asc&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

  const brandCategories = await fetcher(
    `${Config.apiUrl}/wp/v2/categories?parent=112&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

  const brands = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=112&per_page=20&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

  const capability = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=216&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

  const industries = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=111&filter[orderby]=id&order=asc&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

  return {
    sliders,
    query,
    brandCategories,
    brands,
    capability,
    industries,
  };
};

export default Index;
