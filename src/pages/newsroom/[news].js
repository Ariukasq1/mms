import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import {
  fetcher,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
  getLangParam,
  __,
} from "../../utils";
import FullPage from "../../components/FullPage";

const settings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  rows: 2,
  autoplay: false,
  autoplaySpeed: 3000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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

const News = (props) => {
  const currentLanguage = getLangParam();
  const post = props.details[0];

  const renderNews = props.news.map((n, index) => {
    return (
      <div key={index}>
        <div className="newsBox mb-20 xl:mb-8 md:mb-12 pr-8 sm:mb-5 sm:pr-0 3xl:mb-10 2xl:mb-0">
          <Link
            href={{
              pathname: "/newsroom/[news]#1",
              query: { news: props.news.slug },
            }}
            as={`/newsroom/${n.slug}?lang=${currentLanguage}#1`}
          >
            <a>
              <div className="image-wrapper h-48 w-full xl:h-28 2xl:h-40">
                <img
                  className="h-full w-full object-cover"
                  src={getData(n._embedded, "image")}
                />
              </div>
              <div className="font-medium text-sm mb-4 title leading-5 mt-5 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-3 2xl:mt-2 2xl:mb-0">
                {n.title.rendered}
              </div>
            </a>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage homeScreen">
            <div className="section news-detail">
              <div
                className={
                  "pl-24 flex h-body lg:block lg:pl-20 md:block sm:block sm:px-5 sm:h-auto lg:overflow-auto md:overflow-auto md:h-auto md:px-10"
                }
              >
                <div
                  className={
                    "w-1/2 h-full overflow-auto lg:w-full md:w-full sm:w-full lg:mt-5 md:mt-5 sm:mt-5 sm:overflow-hidden lg:h-auto md:h-auto pt-10"
                  }
                >
                  <h2 className={"mb-10 font-medium text-sm sm:mb-5"}>
                    #{__("News")}
                  </h2>
                  <h2 className={"mb-4 font-bold text-xl"}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />
                  </h2>
                  <div className="content">
                    <div
                      className={"text-base pr-5"}
                      dangerouslySetInnerHTML={{
                        __html: post.content.rendered,
                      }}
                    />
                  </div>
                </div>
                <div
                  className={
                    "w-1/2 h-full xl:h-full lg:w-full lg:h-auto md:w-full md:h-auto sm:w-full sm:h-auto "
                  }
                >
                  <img
                    className="w-full object-cover h-full"
                    src={getData(post._embedded, "image")}
                  />
                </div>
              </div>
            </div>
            <div className="section odd otherNews">
              <div className="pl-40 pr-12 md:px-10 2xl:pt-28 2xl:px-20 sm:px-5 sm:h-auto md:h-auto md:overflow-hidden md:pb-10 sm:pb-10">
                <h2 className=" text-3xl font-bold mb-8 capitalize 2xl:mb-2">
                  {__("Related news")}
                </h2>
                <div className="brands news-slider sm:pb-20 ">
                  <Slider {...settings}>{renderNews}</Slider>
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
  const slug = ctx.query.news;

  const details = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const news = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=1&per_page=20&lang=${
      lang === "mn" ? lang : ""
    }`
  );

  return { props: { details, news } };
};

export default News;
