import React from "react";
import { Config } from "../config";
import HomeSlider from "../components/layouts/HomeSlider";
import CapabilitiesComponent from "../components/CapabilitiesComponent";
import IndustryComponent from "../components/IndustryComponent";
import BrandsComponent from "../components/BrandsComponent";
import { fetcher } from "../utils";
import FullPage from "../components/FullPage";
import Footer from "../components/layouts/footer";

const Index = ({
  sliders,
  brandCategories,
  brands,
  capability,
  industries,
  contact,
}) => {
  return (
    <FullPage
      page="home"
      children={
        <>
          <div className="section slider">
            <HomeSlider sliders={sliders} />
          </div>
          <div className="section capabilities">
            <CapabilitiesComponent data={capability[0]} />
          </div>
          <div className="section industry">
            <IndustryComponent industries={industries} />
          </div>
          <div className="section brands">
            <BrandsComponent
              brands={brands}
              brandCategories={brandCategories}
            />
          </div>
          <div className="section footer">
            <Footer contact={contact} />
          </div>
        </>
      }
    />
  );
};

Index.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;

  const sliders = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=215&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

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

  const capability = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=216&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const industries = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=111&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const contact = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=235&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return {
    sliders,
    brandCategories,
    brands,
    capability,
    industries,
    contact,
  };
};

export default Index;
