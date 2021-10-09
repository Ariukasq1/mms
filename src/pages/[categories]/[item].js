import React from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import { fetcher, __ } from "../../utils";
import FullPage from "../../components/FullPage";
import ItemDetail from "./detail";
import ItemFacts from "./facts";
import ItemRelations from "./relations";
import Additional from "./additional";
import SliderSubCategories from "../../components/SliderSubCategories";

const FactsSection = (posts, detail, lang) => {
  if (
    posts.filter(
      (post) => post.acf && Object.keys(post.acf).includes("group_1")
    ).length === 0
  ) {
    return null;
  }

  return (
    <div className="section facts">
      <ItemFacts post={detail[0]} lang={lang} />
    </div>
  );
};

const AdditionSection = (posts, detail, lang) => {
  if (
    posts.filter(
      (post) => post.acf && Object.keys(post.acf).includes("group_1")
    ).length === 0
  ) {
    return null;
  }

  return (
    <div className="section additional">
      <Additional post={detail[0]} lang={lang} />
    </div>
  );
};

const Item = (props) => {
  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage">
            <div className="section categories">
              <div className="capabilitiesPage">
                <div className="capabilitiesPageSlider px-64 xl:px-20 2xl:px-40 md:px-10 lg:px-24 sm:px-5 h-body overflow-auto sm:h-auto md:h-auto">
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
            <div className="section odd item-detail">
              <ItemDetail post={props.detail[0]} lang={props.lang} />
            </div>
            {FactsSection(props.posts, props.detail, props.lang)}
            {AdditionSection(props.posts, props.detail, props.lang)}
            <div className="section relations">
              <ItemRelations lang={props.lang} post={props.detail[0]} />
            </div>
          </div>
        }
      />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const lang = ctx.query.lang;
  const slug = ctx.query.item;

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

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { props: { posts, querySlug, detail, lang } };
};

export default Item;
