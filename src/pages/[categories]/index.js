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
import { fetcher } from "../../utils";

const anchors = ["1", "2", "3"];
const Categories = ({ industries, querySlug }) => {
  const { language } = mainStore();

  return (
    <Layout>
      <div className="relative">
        <ReactFullpage
          anchors={anchors}
          navigationPosition={"left"}
          navigation
          navigationTooltips={anchors}
          scrollOverflow={true}
          paddingTop={"116px"}
          render={({ state, fullpageApi }) => {
            return (
              <div id="fullpage">
                <div className="section categories">
                  <div className="capabilitiesPage">
                    <div className="capabilitiesPageSlider px-72 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-12">
                      <div className="brands">
                        <div className="header">
                          <h2>{querySlug}</h2>
                        </div>
                        <SliderSubCategories
                          data={industries}
                          querySlug={querySlug}
                          language={language}
                        />
                      </div>
                    </div>
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

Categories.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;
  const querySlug = ctx.query.categories;
  const categories = querySlug === "capabilities" ? 110 : 111;

  const industries = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=${categories}&per_page=100&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  return { industries, querySlug };
};

export default Categories;
