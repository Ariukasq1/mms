import React from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import SliderSubCategories from "../../components/SliderSubCategories";
import { fetcher, __ } from "../../utils";
import FullPage from "../../components/FullPage";

const Categories = ({ posts, querySlug, lang }) => {
  return (
    <Layout>
      <div className="relative">
        <FullPage
          children={
            <div id="fullpage">
              <div className="section categories">
                <div className="capabilitiesPage">
                  <div className="capabilitiesPageSlider px-64 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-8">
                    <div className="brands">
                      <div className="header">
                        <h2>{__(querySlug)}</h2>
                      </div>
                      <SliderSubCategories
                        pathname="[categories]"
                        data={posts}
                        querySlug={querySlug}
                        language={lang}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
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
    }/wp/v2/posts?_embed&categories=${catId}&per_page=40&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=mn" : "lang="
    }`
  );

  return { posts, querySlug, lang };
};

export default Categories;
