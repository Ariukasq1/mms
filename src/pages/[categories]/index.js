import React from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import SliderSubCategories from "../../components/SliderSubCategories";
import { fetcher, __ } from "../../utils";
import FullPage from "../../components/FullPage";

export const CategoriesItem = (posts, querySlug, lang) => {
  return (
    <div className="capabilitiesPage">
      <div className="capabilitiesPageSlider px-32 pt-16 2xl:px-28 2xl:pt-28 xl:px-24 xl:pt-24 lg:px-20 lg:pt-28 md:pt-28 md:px-10 sm:px-5 sm:h-auto md:h-auto lg:h-auto sm:pt-0">
        <div className="brands">
          <h2 className="ml-5 text-3xl font-bold mb-8 capitalize 2xl:mb-5 xl:mb-2 xl:ml-2 lg:ml-0 lg:mb-2 md:m-0 sm:m-0">
            {__(querySlug)}
          </h2>
          <SliderSubCategories
            pathname="[categories]"
            data={posts}
            querySlug={querySlug}
            language={lang}
          />
        </div>
      </div>
    </div>
  );
};

const Categories = ({ posts, querySlug, lang }) => {
  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage">
            <div className="section categories">
              {CategoriesItem(posts, querySlug, lang)}
            </div>
          </div>
        }
      />
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
