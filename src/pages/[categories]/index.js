import React from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import SliderSubCategories from "../../components/SliderSubCategories";
import { fetcher, __, getLangParam } from "../../utils";
import FullPage from "../../components/FullPage";
// import ItemDetail from "./detail";
// import ItemFacts from "./facts";
// import ItemRelations from "./relations";
// import Additional from "./additional";

const Categories = ({ posts, querySlug, lang }) => {
  // const [showDetail, setShowDetail] = useState(false);
  // const [currentItemId, setCurrentItemId] = useState(null);
  const currentLanguage = getLangParam();

  // const getCurrentItemId = (currentItemId) => {
  //   setCurrentItemId(currentItemId);
  //   setShowDetail(true);
  //   console.log("i am cuurent item id");
  // };
  // console.log("isChange", showDetail);
  return (
    <Layout>
      <div className="relative">
        <FullPage
          children={
            <div id="fullpage">
              <div className="section categories">
                <div className="capabilitiesPage">
                  <div className="capabilitiesPageSlider px-64 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:pl-12 sm:pr-5">
                    <div className="brands">
                      <div className="header">
                        <h2>{__(querySlug)}</h2>
                      </div>
                      <SliderSubCategories
                        pathname="[categories]"
                        data={posts}
                        // getCurrentItemId={getCurrentItemId}
                        querySlug={querySlug}
                        language={currentLanguage}
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
