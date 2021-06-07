import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import ReactFullpage from "../../lib/fullpage";
import {
  fetcher,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
  getLangParam,
  __,
} from "../../utils";

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
        <div className="newsBox mb-20 lg:mb-14 md:mb-12 pr-8 sm:mb-5">
          <Link
            href={{
              pathname: "/newsroom/[news]#1",
              query: { news: news.slug },
            }}
            as={`/newsroom/${n.slug}?lang=${currentLanguage}#1`}
          >
            <a>
              <div className="image-wrapper">
                <img src={getData(n._embedded, "image")} />
              </div>
              <div className="font-medium text-base text-sm mb-4 title leading-5 mt-5 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-3">
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
      <ReactFullpage
        navigationPosition={"left"}
        navigation
        // paddingTop={"116px"}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage homeScreen">
              <div className="section news-detail">
                <div
                  className={
                    "pl-24 flex flex-row justify-center items-center h-full lg:block lg:pl-20 md:block sm:block sm:pl-12"
                  }
                >
                  
                  <div className={"w-1/2 xl:auto-overflow lg:w-full md:w-full sm:w-full lg:mt-5 md:mt-5 sm:mt-5"}>
                    <h2 className={"mb-10 font-medium text-sm"}>
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
                  <div className={"w-1/2 h-full lg:w-full lg:h-auto md:w-full md:h-auto sm:w-full sm:h-auto "}>
                    <div className="h-full w-full overflow-hidden">
                      <img
                        className="w-full object-cover h-full"
                        src={getData(post._embedded, "image")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="section odd otherNews">
                <div className="pl-40 pr-12 md:pl-24 md:pr-0 sm:pr-0 sm:pl-12">
                  <div className="header">
                    <h2>{__("Related news")}</h2>
                  </div>
                  <div className="brands news-slider">
                    <Slider {...settings}>{renderNews}</Slider>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
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
