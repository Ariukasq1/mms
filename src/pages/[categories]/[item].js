import React from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import mainStore from "../../stores";
import ReactFullpage from "../../lib/fullpage";
import SliderSubCategories from "../../components/SliderSubCategories";
import ItemDetailsWithGallery from "../../components/ItemDetailsWithGallery";
import { fetcher, getData } from "../../utils";
import RelationSlider from "../../components/RelationSlider";

const anchors = ["1", "2", "3"];
const Item = ({ postItems, detail, querySlug, posts }) => {
  const { language } = mainStore();

  if (!detail || detail.length === 0) {
    return null;
  }

  const post = detail[0];

  const { brands, capabilities, industries } = (post && post.acf) || {};

  const hasRelation =
    (brands || []).length !== 0 ||
    (capabilities || []).length !== 0 ||
    (industries || []).length !== 0
      ? true
      : false;

  const renderRelations = (title, items) => {
    return (
      <div>
        <h4 className="mb-20 font-semibold text-xl capitalize">{title}</h4>
        <RelationSlider items={items} querySlug={title} posts={posts} />
      </div>
    );
  };

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
                        <SliderSubCategories
                          data={postItems}
                          querySlug={querySlug}
                          language={language}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section odd category-item">
                  <div className="pl-24 xl:pl-24 lg:pl-24 md:pl-24 sm:px-16">
                    <div className="flex">
                      <div className="w-1/2 flex flex-col justify-center flex-center mr-16">
                        <b>
                          <span className="block text-lg mb-20">
                            #{post.title.rendered}
                          </span>
                        </b>
                        <div className="auto-overflow">
                          <div
                            className="text-base"
                            dangerouslySetInnerHTML={{
                              __html: post.content.rendered,
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-1/2">
                        {!post.acf.image_1 ? (
                          <img
                            className="object-cover object-center h-body w-full"
                            src={getData(post._embedded, "image")}
                            alt={post.title.rendered}
                          />
                        ) : (
                          <ItemDetailsWithGallery
                            images={Object.values(post.acf)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {hasRelation && (
                  <div className="section category-brand">
                    <div className="px-40 bg-white">
                      {(brands || []).length !== 0 &&
                        renderRelations("brands", brands)}
                      {(capabilities || []).length !== 0 &&
                        renderRelations("capabilities", capabilities)}
                      {(industries || []).length !== 0 &&
                        renderRelations("industries", industries)}
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>
    </Layout>
  );
};

Item.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;
  const querySlug = ctx.query.categories;
  const slug = ctx.query.item;
  const categories = querySlug === "capabilities" ? 110 : 111;

  const postItems = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=${categories}&per_page=40&filter[orderby]=id&order=asc${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const posts = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&per_page=100&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { postItems, detail, querySlug, posts };
};

export default Item;
