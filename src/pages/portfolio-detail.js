import React from "react";
import Layout from "../components/layouts/Layout";
import ItemDetailsWithGallery from "../components/ItemDetailsWithGallery";
import { Config } from "../config";
import Slider from "react-slick";
import {
  fetcher,
  __,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
} from "../utils";
import Material from "./Material";
import FullPage from "../components/FullPage";
import { SliderSubCategories } from "./portfolio";
import { renderProjects, projectInfo } from "./portfolio/[item]";

const Detail = ({ posts, detail, projects, projectDetails, lang }) => {
  const post = detail[0];
  const projectDetail = projectDetails.length > 0 ? projectDetails[0] : null;

  const settingsItems = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    rows: !post.content.rendered ? 2 : 2,
    slidesPerRow: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          rows: 2,
          infinite: true,
          slidesPerRow: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          rows: 2,
          infinite: true,
          slidesPerRow: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          rows: 2,
          infinite: true,
          slidesPerRow: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          rows: 2,
          infinite: true,
          slidesPerRow: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          rows: 2,
          infinite: true,
          slidesPerRow: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage">
            <div className="section categories">
              <div className="capabilitiesPage">
                <div className="capabilitiesPageSlider h-body px-40 flex items-center 2xl:px-28 xl:px-24 lg:px-20 lg:pt-28 md:pt-28 md:px-10 sm:px-5 sm:h-auto md:h-auto lg:h-auto sm:pt-0">
                  <div className="brands">
                    <h2 className="ml-5 text-3xl font-bold mb-8 capitalize 2xl:mb-5 xl:mb-2 xl:ml-2 lg:ml-0 lg:mb-2 sm:m-0 md:m-0">
                      {__("Portfolio")}
                    </h2>
                    <SliderSubCategories
                      data={posts}
                      querySlug="portfolio"
                      language={lang}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="section project-info">{projectInfo(post)} </div>
            <div
              className="section projects"
              style={{
                backgroundImage: `url(${getData(post._embedded, "image")})`,
              }}
            >
              <div className="projects-wrapper pl-32 2xl:pt-28 xl:pt-28 xl:px-16 md:px-10 lg:px-20 sm:px-8 sm:h-auto sm:overflow-hidden sm:py-16 md:h-auto md:overflow-hidden md:pb-16 lg:h-auto lg:pb-20">
                <div className="desc mb-10 xl:mb-5 sm:mb-5 2xl:mb-0">
                  <h4 className="mb-5">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />
                  </h4>
                </div>
                <div>
                  {(projects || []).length > 8 ? (
                    <div className="brands pl-12 pr-32 xl:pl-0 2xl:pl-0 project-slider lg:pl-0 lg:pr-5 xl:px-0 md:px-0 sm:pl-0 sm:pr-0">
                      <Slider {...settingsItems}>
                        {renderProjects(projects, post, lang)}
                      </Slider>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 px-10 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 sm:pl-0 sm:pr-5">
                      {renderProjects(projects, post, lang)}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="section project-info project-details">
              <div className="projects-wrapper pl-32 xl:pl-20 lg:px-20 lg:my-10 md:p-10 sm:p-5 h-body overflow-auto md:h-auto sm:h-auto lg:h-auto">
                <div className="flex lg:block md:block sm:block">
                  <div className="w-1/2 flex flex-col justify-center flex-center mr-16 xl:mr-8 lg:w-full md:w-full sm:w-full">
                    <b>
                      <span className="block">{post.title.rendered}</span>
                    </b>
                    <h4 className="mb-5">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: projectDetail.title.rendered,
                        }}
                      />
                    </h4>
                    <p className="text-base">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: projectDetail.content.rendered,
                        }}
                      />
                    </p>
                  </div>
                  <div className="w-1/2 lg:w-full md:w-full sm:w-full lg:h-auto md:h-auto sm:h-auto">
                    {Object.values(projectDetail.acf).length === 0 ||
                    !projectDetail.acf.image_1 ? (
                      <img
                        className="object-cover object-center portfolio-h-body h-body w-full lg:h-auto md:h-auto sm:h-auto"
                        src={getData(projectDetail._embedded, "image")}
                        alt={projectDetail.title.rendered}
                      />
                    ) : (
                      <ItemDetailsWithGallery
                        images={Object.values(projectDetail.acf)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {projectDetail.acf.length !== 0 && (
              <div className="section portfolio-usage">
                <div className="usage relative md:h-auto h-body flex flex-col justify-center overflow-auto sm:h-auto z-30 lg:h-auto">
                  <div
                    className={
                      "px-72 flex flex-col justify-center xl:px-20 2xl:px-40 md:p-10 md:flex-col lg:px-20 sm:flex-col sm:px-5 lg:py-10 sm:py-16"
                    }
                  >
                    <h2 className={"uppercase text-white mb-10"}>
                      {__("Products")}
                    </h2>
                    <div className="grid grid-cols-3 mb-8 gap-8 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 ">
                      {((projectDetail.acf || {}).products || []).map(
                        (product) => (
                          <Material
                            key={product}
                            productId={product}
                            lang={lang}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
      />
    </Layout>
  );
};

Detail.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;
  const parentSlug = ctx.query.parentSlug;
  const slug = ctx.query.slug;

  const posts = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=194&per_page=20&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${parentSlug}&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const catId =
    detail.length > 0 && detail[0].categories.length > 0
      ? detail[0].categories[0]
      : 195;

  const projects = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=${catId}&per_page=40&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const projectDetails = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { posts, detail, projects, projectDetails, lang };
};

export default Detail;
