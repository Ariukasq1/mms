import React from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import mainStore from "../../stores";
import ReactFullpage from "../../lib/fullpage";
import SliderSubCategories from "../../components/SliderSubCategories";
import ItemDetailsWithGallery from "../../components/ItemDetailsWithGallery";
import { fetcher } from "../../utils";
import RelationSlider from "../../components/RelationSlider";

const anchors = ["1", "2", "3"];
const Item = ({ industries, detail, querySlug }) => {
  const { language } = mainStore();
  const post = detail[0];
  // console.log(post);
  const renderRelations = (title, items) => {
    return (
      <div>
        <h4>{title}</h4>
        {((items && items) || []).map((item) => (
          <RelationSlider key={item} item={item} />
        ))}
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
                    <div className="capabilitiesPageSlider px-72 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-12">
                      <div className="brands">
                        <SliderSubCategories
                          data={industries}
                          querySlug={querySlug}
                          language={language}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section odd category-item">
                  <div className="xl:pl-24 lg:pl-24 md:pl-24 sm:px-16">
                    <div className="flex">
                      <div className="w-1/2 flex flex-col justify-center flex-center mr-16">
                        <span className="block mb-20">
                          #{post.title.rendered}
                        </span>
                        <p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: post.content.rendered,
                            }}
                          />
                        </p>
                      </div>
                      <div className="w-1/2">
                        <ItemDetailsWithGallery
                          images={Object.values(post.acf)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section category-brand">
                  <div className="pr-32 xl:pr-10 xl:pl-24 lg:pr-10 lg:pl-24 md:pl-24 md:pr-4 sm:px-16 sm:pr-8 bg-white">
                    {renderRelations("Brands", post.acf.brands)}
                    {renderRelations("Capabilities", post.acf.capabilities)}
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

Item.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;
  const querySlug = ctx.query.categories;
  const slug = ctx.query.item;

  const industries = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=111&per_page=100&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const brands = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  return { industries, detail, querySlug };
};

export default Item;
