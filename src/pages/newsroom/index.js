import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
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
import FullPage from "../../components/FullPage";

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
        rows: 1,
        infinite: true,
        slidesPerRow: 1,
        dots: false,
      },
    },
  ],
};

const Index = (props) => {
  const currentLanguage = getLangParam();
  const [catId, setCatId] = useState(948);
  const categories = props.categories;

  const onClick = (value) => {
    setCatId(value);
  };

  const renderNews = (news) => {
    return (
      <div key={news.id} className="news-wrapper">
        <div
          className="relative news-item h-64 3xl:h-56 2xl:h-40 xl:h-40"
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
      <ul className="flex justify-center category-wrapper mb-5 xl:mb-0 2xl:mb-1">
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <li
              className={`text-base font-medium pr-2 text-left list-none ${
                catId === category.id ? "active text-menuTextColor" : ""
              }`}
              onClick={() => onClick(category.id)}
            >
              {category.name}
              <span className="pl-2 font-bold">|</span>
            </li>
          </React.Fragment>
        ))}
      </ul>
    );
  };

  const renderPosts = () => {
    const filteredNews = props.newsroom.filter((news) =>
      news.categories.includes(catId)
    );

    return filteredNews.length > 7 ? (
      <div className="brands news-slider">
        <Slider {...settings}>
          {filteredNews.map((news) => renderNews(news))}
        </Slider>
      </div>
    ) : (
      <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:mb-20">
        {filteredNews.map((news) => renderNews(news))}
      </div>
    );
  };

  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage">
            <div className="section news">
              <div className="px-56 2xl:px-40 2xl:pt-20 pt-16 xl:px-24 xl:pt-20 lg:px-20 lg:pt-28 md:px-10 sm:px-5 sm:h-auto md:h-auto lg:h-auto md:overflow-hidden sm:overflow-hidden">
                <div className="brands text-center">
                  <div className="heading-title capitalize text-5xl mt-2 mb-6 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
                    {__("Newsroom")}
                  </div>
                  {renderCategory()}
                </div>
                {renderPosts()}
              </div>
            </div>
          </div>
        }
      />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
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

  return { props: { newsroom, categories } };
};

export default Index;
