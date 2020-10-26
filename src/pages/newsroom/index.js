import React from "react";
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import { Config } from "../../config";
import mainStore from "../../stores";
import Link from "next/link";
import Slider from "react-slick";
import {
  fetcher,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
} from "../../utils";

const settings = {
  infinite: false,
  slidesToShow: 3,
  initialSlide: 0,
  speed: 500,
  rows: 2,
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

const Index = ({ newsroom }) => {
  const { language } = mainStore();

  const renderNews = (news) => {
    return (
      <div key={news.id} className="news-wrapper">
        <div
          className="relative news-item"
          style={{
            backgroundImage: `url(${getData(news._embedded, "image")})`,
          }}
        >
          <div className="content relative p-6 h-full">
            <Link
              href={{
                pathname: "/newsroom/[news]",
                query: { news: news.slug },
              }}
              as={`/newsroom/${news.slug}?lang=${language}`}
            >
              <a
                className={
                  "text-base font-medium leading-5 text-white w-full flex items-end h-full overflow-hidden"
                }
              >
                {news.title.rendered}
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <ReactFullpage
        navigationPosition={"left"}
        navigation
        paddingTop={"116px"}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage">
              <div className="section px-56 xl:px-56 lg:px-56 md:px-56 sm:px-24 news">
                <div className="header">
                  <h2>Newsroom</h2>
                </div>

                {newsroom.length > 7 ? (
                  <div className="brands news-slider">
                    <Slider {...settings}>
                      {newsroom.map((news) => renderNews(news))}
                    </Slider>
                  </div>
                ) : (
                  <div className="grid grid-cols-4">
                    {newsroom.map((news) => renderNews(news))}
                  </div>
                )}
              </div>
            </div>
          );
        }}
      />
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  const query = ctx.query.lang;

  const newsroom = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=1&per_page=100&lang=${
      query === "mn" ? query : ""
    }`
  );

  return { newsroom };
};

export default Index;
