import React from "react";
import Link from "next/link";
import Layout from "../components/layouts/Layout";
import ItemDetailsWithGallery from "../components/ItemDetailsWithGallery";
import { Config } from "../config";
import Slider from "react-slick";
import arrowImage from "../public/images/arrow-white.svg";
import arrowImageBlue from "../public/images/arrow-blue.svg";
import {
  fetcher,
  __,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
  getLangParam,
} from "../utils";
import Material from "./Material";
import FullPage from "../components/FullPage";
import { SliderSubCategories } from "./portfolio";
import { renderProjects, projectInfo } from "./portfolio/[item]";

const Detail = (props) => {
  const post = props.detail[0];
  const projectDetail = props.projectDetails[0];
  const currentLanguage = getLangParam();

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
                <div className="capabilitiesPageSlider px-32 pt-16 2xl:px-28 2xl:pt-28 xl:px-24 xl:pt-24 md:px-10 lg:px-24 sm:px-5 md:h-auto sm:h-auto">
                  <div className="brands">
                    <h2 className="ml-5 text-3xl font-bold mb-8 2xl:mb-5 xl:mb-2 capitalize">
                      {__("Portfolio")}
                    </h2>
                    <SliderSubCategories
                      data={props.posts}
                      querySlug="portfolio"
                      language={props.lang}
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
              <div className="projects-wrapper pl-32 xl:px-16 md:px-10 lg:pl-16 sm:px-8 sm:h-auto sm:overflow-hidden sm:pb-16 md:h-auto md:overflow-hidden md:pb-16 2xl:pt-28 xl:pt-28">
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
                  {(props.projects || []).length > 8 ? (
                    <div className="brands pl-12 pr-32 xl:pl-0 2xl:pl-0 project-slider lg:pl-0 lg:pr-5 xl:px-0 md:px-0 sm:pl-0 sm:pr-0">
                      <Slider {...settingsItems}>
                        {renderProjects(props.projects, post, props.lang)}
                      </Slider>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 px-10 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 sm:pl-0 sm:pr-5">
                      {renderProjects(props.projects, post, props.lang)}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="section project-info project-details">
              <div className="projects-wrapper pl-32 xl:pl-32 lg:pl-32 md:px-10 sm:px-5 h-body overflow-auto md:h-auto sm:h-auto">
                <div className="flex lg:block md:block sm:block">
                  <div className="w-1/2 flex flex-col justify-center flex-center mr-16 lg:w-full md:w-full sm:w-full">
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
                        className="object-cover object-center portfolio-h-body h-body w-full"
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
                <div className="usage relative md:h-auto h-body overflow-auto sm:h-auto z-30">
                  <div
                    className={
                      "px-72 flex flex-col justify-center xl:px-20 2xl:px-40 md:px-10 md:flex-col lg:px-20 sm:flex-col sm:px-5"
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
                            lang={props.lang}
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

export const getServerSideProps = async (ctx) => {
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
    detail[0].categories.length !== 0 ? detail[0].categories[0] : 195;

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

  return { props: { posts, detail, projects, projectDetails, lang } };
};

export default Detail;
