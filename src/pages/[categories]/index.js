import React from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import SliderSubCategories from "../../components/SliderSubCategories";
import { fetcher, __ } from "../../utils";
import FullPage from "../../components/FullPage";

const Categories = (props) => {
  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage">
            <div className="section categories">
              <div className="capabilitiesPage">
                <div className="capabilitiesPageSlider px-64 xl:px-32 2xl:px-40 md:px-20 lg:px-24 sm:px-8 md:pt-28">
                  <div className="brands">
                    <h2 className=" text-3xl font-bold mb-8 capitalize">
                      {__(props.querySlug)}
                    </h2>
                    <SliderSubCategories
                      pathname="[categories]"
                      data={props.posts}
                      querySlug={props.querySlug}
                      language={props.lang}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
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

  return { props: { posts, querySlug, lang } };
};

export default Categories;
