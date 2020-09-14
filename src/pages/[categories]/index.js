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

const settings = {
  className: "center",
  infinite: true,
  autoplay: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  rows: 1,
  slidesPerRow: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const anchors = ["1", "2", "3"];
const Categories = ({
  brands,
  categories,
  querySlug,
  relativeCategory,
  relative_child,
  relativeCategory1,
  relative_child1,
}) => {
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
          onLeave={(origin, destination, direction) => {
            // console.log("onLeave event", {origin, destination, direction});
          }}
          render={({ state, fullpageApi }) => {
            // console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

            return (
              <div id="fullpage">
                <div className="section">
                  <div className="capabilitiesPage">
                    <div className="capabilitiesPageContent"></div>
                    <div
                      className="capabilitiesPageSlider px-72 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-12"
                      style={{ flexBasis: "50%" }}
                    >
                      {
                        querySlug === "brands" ? (
                          <BrandsComponent data={brands} />
                        ) : (
                          // <Slider {...settings} className="h-full">
                          //     {renderCategories}
                          <SliderSubCategories
                            data={categories}
                            querySlug={querySlug}
                            language={language}
                          />
                        )
                        // </Slider>
                      }
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div
                    className="capabilitiesPageSlider px-72 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-12"
                    style={{ flexBasis: "50%" }}
                  >
                    {querySlug !== "brands" ? (
                      <BrandsComponent data={brands} />
                    ) : (
                      <RelativeCategory
                        category={relativeCategory1}
                        child={relative_child1}
                      />
                    )}
                    <RelativeCategory
                      category={relativeCategory}
                      child={relative_child}
                      querySlug={querySlug}
                    />
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
  const language = configureLanguage(ctx);
  const query = ctx.query.lang;
  const querySlug = ctx.query.categories;
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  // const brands = await fetcher(`${Config.apiUrl}/wp/v2/brands${query === 'mn' ? '?lang=' + query : ''}`)
  const brands = await fetcher(
    `${Config.apiUrl}/wp/v2/navigation_menus?slug=brands&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );
  const category = await fetcher(
    `${Config.apiUrl}/wp/v2/navigation_menus?slug=${querySlug}&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );
  const categories = await fetcher(
    `${Config.apiUrl}/wp/v2/navigation_menus?parent=${category.map(
      (data) => data.id
    )}&${query === "mn" ? "?lang=" + query : ""}`
  );
  const relative_acf = category[0].acf.relative_category[0];
  const relative_acf1 = category[0].acf.relative_category[1];
  const relativeCategory = await fetcher(
    `${Config.apiUrl}/wp/v2/navigation_menus/${relative_acf}${
      query === "mn" ? "?lang=" + query : ""
    }`
  );
  const relative_child = await fetcher(
    `${Config.apiUrl}/wp/v2/navigation_menus?parent=${relativeCategory.id}&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );

  let relativeCategory1;
  let relative_child1;

  if (querySlug === "brands") {
    relativeCategory1 = await fetcher(
      `${Config.apiUrl}/wp/v2/navigation_menus/${relative_acf1}${
        query === "mn" ? "?lang=" + query : ""
      }`
    );
    relative_child1 = await fetcher(
      `${Config.apiUrl}/wp/v2/navigation_menus?parent=${relativeCategory1.id}&${
        query === "mn" ? "?lang=" + query : ""
      }`
    );

    return {
      brands,
      categories,
      querySlug,
      relativeCategory,
      relative_child,
      relativeCategory1,
      relative_child1,
    };
  } else {
    return { brands, categories, querySlug, relativeCategory, relative_child };
  }
};

export default Categories;
