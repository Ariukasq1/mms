import React from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import mainStore from "../../stores";
import ReactFullpage from "../../lib/fullpage";
import SliderSubCategories from "../../components/SliderSubCategories";
import { fetcher } from "../../utils";

const anchors = ["1", "2", "3"];
const Categories = ({ posts, querySlug }) => {
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
                    <div className="capabilitiesPageSlider px-64 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-12">
                      <div className="brands">
                        <div className="header">
                          <h2>{querySlug}</h2>
                        </div>
                        <SliderSubCategories
                          data={posts}
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
  const catId =
    querySlug === "capabilities" ? 110 : querySlug === "portfolio" ? 194 : 111;

  const posts = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=${catId}&per_page=40&filter[orderby]=id&order=asc${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { posts, querySlug };
};

export default Categories;
