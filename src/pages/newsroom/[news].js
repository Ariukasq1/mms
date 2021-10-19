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

const News = ({ details, news }) => {
  const currentLanguage = getLangParam();
  const post = details[0];

  const renderNews = news.map((n, index) => {
    return (
      <div key={index}>
        <div className="newsBox mb-5 mr-8 xl:mb-1 md:mb-12 sm:mb-5 sm:pr-0 2xl:mb-0">
          <Link
            href={{
              pathname: "/newsroom/[news]#1",
              query: { news: news.slug },
            }}
            as={`/newsroom/${n.slug}?lang=${currentLanguage}#1`}
          >
            <a>
              <div className="image-wrapper h-40 w-full xl:h-28 2xl:h-40">
                <img
                  className="h-full w-full object-cover"
                  src={getData(n._embedded, "image")}
                />
              </div>
              <div className="font-medium text-sm mb-0 title leading-5 mt-2 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-1 2xl:mt-2 2xl:mb-0">
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
                  "flex h-body lg:block lg:px-20 md:block sm:block sm:px-5 sm:h-auto md:h-auto md:px-10 lg:h-auto lg:pt-20 lg:mb-10 md:pt-20 md:pb-10"
                }
              >
                <div
                  className={
                    "w-1/2 pl-40 pr-20 pt-10 h-full overflow-auto 3xl:pl-20 3xl:pr-16 2xl:pl-20 2xl:pr-10 xl:pl-16 xl:pr-8 lg:w-full md:w-full sm:w-full lg:mt-5 md:mt-5 sm:mt-5 sm:overflow-hidden lg:h-auto md:h-auto"
                  }
                >
                  <h2 className={"font-medium text-sm sm:mb-5"}>
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
                      className={"text-base"}
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
              <div className="pl-40 pr-20 md:px-10 2xl:pt-28 2xl:px-20 sm:px-5 sm:h-auto md:h-auto md:overflow-hidden md:pb-10 sm:pb-10 xl:px-16 xl:pt-20 lg:h-auto lg:px-20 lg:pt-10">
                <h2 className=" text-3xl font-bold mb-3 capitalize 2xl:mb-2">
                  {__("Related news")}
                </h2>
                <div className="brands news-slider sm:pb-20 lg:pb-20">
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

News.getInitialProps = async (ctx) => {
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

  return { details, news };
};

export default News;
