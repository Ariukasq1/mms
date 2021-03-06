import React from "react";
import { Config } from "../../config";
import { fetcher, __ } from "../../utils";
import FullPage from "../../components/FullPage";
import ItemDetail from "./detail";
import ItemFacts from "./facts";
import ItemRelations from "./relations";
import Additional from "./additional";
import { CategoriesItem } from ".";

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

const Item = ({ posts, querySlug, detail, lang }) => {
  return (
    <FullPage
      children={
        <div id="fullpage">
          <div className="section categories">
            {CategoriesItem(posts, querySlug, lang)}
          </div>
          <div className="section item-detail">
            <ItemDetail post={detail[0]} lang={lang} />
          </div>
          {FactsSection(posts, detail, lang)}
          {AdditionSection(posts, detail, lang)}
          <div className="section relations">
            <ItemRelations lang={lang} post={detail[0]} />
          </div>
        </div>
      }
    />
  );
};

Item.getInitialProps = async (ctx) => {
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

  return { posts, querySlug, detail, lang };
};

export default Item;
