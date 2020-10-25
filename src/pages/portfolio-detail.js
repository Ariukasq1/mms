import React from "react";
import Layout from "../components/layouts/Layout";
import ReactFullpage from "../lib/fullpage";
import mainStore from "../stores";
import ItemDetailsWithGallery from "../components/ItemDetailsWithGallery";
import { Config } from "../config";
import { configureLanguage } from "../utils/language";
import axios from "axios";
import Slider from "react-slick";
import Link from "next/link";
import arrowImage from "../public/images/arrow-white.svg";
import { fetcher, getData, SampleNextArrow, SamplePrevArrow } from "../utils";
import SliderSubCategories from "../components/SliderSubCategories";

const Detail = ({ posts, detail, projects }) => {
  const post = detail[0];
  const { language } = mainStore();

  const settings = {
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
          dots: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          rows: 2,
          infinite: true,
          slidesPerRow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          rows: 2,
          infinite: true,
          slidesPerRow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          rows: 2,
          infinite: true,
          slidesPerRow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          rows: 1,
          infinite: true,
          slidesPerRow: 1,
          dots: true,
        },
      },
    ],
  };

  const renderProjects = projects.map((project) => (
    <div key={project.id}>
      <div
        className="project flex justify-center align-center row-span-2 col-span-1 relative"
        style={{
          backgroundImage: `url(${getData(project._embedded, "image")})`,
        }}
      >
        <div className="content">
          <h4>
            <div dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
          </h4>
          <div className="flex align-center more">
            <Link
              href={{
                pathname: `/portfolio/detail`,
                query: { lang: language },
              }}
              as={`/portfolio/${project.slug}?lang=${language}#3`}
            >
              <a className="readmore my-4 text-sm w-auto bg-transparent text-black hover:text-opacity-100 hover:text-menuTextColor flex flex-row sm:my-4">
                Read more
              </a>
            </Link>
            <img src={arrowImage} />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <Layout>
      <ReactFullpage
        navigationPosition={"left"}
        navigation
        paddingTop={"116px"}
        scrollOverflow={false}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage">
              <div className="section categories">
                <div className="capabilitiesPage">
                  <div className="capabilitiesPageSlider px-72 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-12">
                    <div className="brands">
                      <SliderSubCategories
                        data={posts}
                        querySlug="portfolio"
                        language={language}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="section projects"
                style={{
                  backgroundImage: `url(${getData(post._embedded, "image")})`,
                }}
              >
                <div className="projects-wrapper pl-32 xl:pl-32 lg:pl-32 md:pl-32 sm:px-24">
                  <div className="desc mb-40">
                    <h4 className="mb-20">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                    </h4>
                    <p className="text-base">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.content.rendered,
                        }}
                      />
                    </p>
                  </div>
                  <div>
                    {projects.length > 8 ? (
                      <div className="brands pl-12 pr-32 project-slider">
                        <Slider {...settings}>{renderProjects}</Slider>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 px-10">
                        {renderProjects}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="section odd project-details">
                <div className="projects-wrapper pl-32 xl:pl-32 lg:pl-32 md:pl-32 sm:px-24">
                  <div className="flex">
                    <div className="w-1/2 flex flex-col justify-center flex-center mr-16">
                      <b>
                        <span className="block mb-20">
                          {post.title.rendered}
                        </span>
                      </b>
                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.content.rendered,
                          }}
                        />
                      </p>
                    </div>
                    <div className="w-1/2">
                      hi
                      {/* {Object.values(post.acf).length === 0 ? (
                          <img
                            className="object-cover object-center h-body w-full"
                            src={getData(post._embedded, "image")}
                            alt={post.title.rendered}
                          />
                        ) : (
                          <ItemDetailsWithGallery
                            images={Object.values(post.acf)}
                          />
                        )} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="section project-usage">
                <div className="projects-wrapper pl-32 xl:pl-32 lg:pl-32 md:pl-32 sm:px-24">
                  hi
                </div>
              </div>
            </div>
          );
        }}
      />
    </Layout>
  );
};

Detail.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;
  const parentSlug = ctx.query.parentSlug;
  const slug = ctx.query.slug;

  const posts = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=194&per_page=100&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${parentSlug}&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const catId =
    detail[0].categories.length !== 0 ? detail[0].categories[1] : 195;

  const projects = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=${catId}&per_page=100&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  return { posts, detail, projects };
};

export default Detail;
