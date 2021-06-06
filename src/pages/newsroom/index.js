import React, { useState } from "react";
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
  __,
  getLangParam,
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

const Index = ({ newsroom, categories }) => {
  const currentLanguage = getLangParam();
  const [catId, setCatId] = useState(948);

  const onClick = (value) => {
    setCatId(value);
  };

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
              as={`/newsroom/${news.slug}?lang=${currentLanguage}`}
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

  const renderCategory = () => {
    return (
      <ul className="flex justify-center category-wrapper mb-10">
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <li
              className={`text-base font-medium p-2 ${
                catId === category.id ? "active" : ""
              }`}
              onClick={() => onClick(category.id)}
            >
              {category.name}
            </li>
            <span className="py-2 font-bold">/</span>
          </React.Fragment>
        ))}
      </ul>
    );
  };

  const renderPosts = () => {
    const filteredNews = newsroom.filter((news) =>
      news.categories.includes(catId)
    );

    return filteredNews.length > 7 ? (
      <div className="brands news-slider">
        <Slider {...settings}>
          {filteredNews.map((news) => renderNews(news))}
        </Slider>
      </div>
    ) : (
      <div className="grid grid-cols-4">
           {filteredNews.map((news) => renderNews(news))}
      </div>
    );
  };

  return (
    <Layout>
      <ReactFullpage
        navigationPosition={"left"}
        navigation
        // paddingTop={"116px"}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage">
              <div className="section px-56 xl:px-24 lg:px-20 md:px-20 sm:pl-14 sm:pr-6  news">
                <div className="brands text-center">
                  <div className="heading-title capitalize text-5xl mt-2 mb-6 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
                    {__("Newsroom")}
                  </div>
                  {renderCategory()}
                </div>
                {renderPosts()}
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

  const categories = await fetcher(
    `${Config.apiUrl}/wp/v2/categories?parent=1&${
      query === "mn" ? "lang=" + query : ""
    }`
  );

  return { newsroom, categories };
};

export default Index;
