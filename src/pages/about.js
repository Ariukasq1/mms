import React from "react";
import Slider from "react-slick";
import moment, { isMoment } from "moment";
import Footer from "../components/layouts/footer";
import { Config } from "../config";
import { fetcher, getData, __ } from "../utils";
import AboutDetail from "./AboutDetail";
import FullPage from "../components/FullPage";

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
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

const About = ({ contact, posts, histories, categories }) => {
  const [activeId, setactiveId] = React.useState(categories[0].id);
  const post = posts[0];

  const onTabChange = (key) => {
    setactiveId(key);
  };

  const renderWhatWeDo = () => {
    return categories.map((cat, index) => {
      if (cat.id !== activeId) {
        return null;
      }

      return (
        <div
          key={index}
          className="about-detail-content w-full md:mb-10 sm:mb-10"
        >
          <AboutDetail catId={activeId} />
        </div>
      );
    });
  };

  const renderTimeline = (history) => {
    const renderDate = (y) => {
      if (!y || !isMoment(y)) {
        return "";
      }

      return (
        <h3>
          {moment(y).format("YYYY")} <span>{moment(y).format("MMM")}</span>
        </h3>
      );
    };

    const { year } = history.acf || {};

    return (
      <div className="history-item" key={history._id}>
        {renderDate(year)}
        <div className="text-center desc content text-base">
          <div dangerouslySetInnerHTML={{ __html: history.content.rendered }} />
        </div>
      </div>
    );
  };

  const cats = (
    <ul className="flex justify-center category-wrapper flex-wrap mb-10 3xl:mb-5 xl:mb-10 sm:text-left sm:mb-10 2xl:mb-3 md:pl-0 sm:pl-0 sm:justify-start">
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <li
            key={category.id}
            className={`text-lg font-medium pr-2 list-none ${
              activeId === category.id ? "active text-menuTextColor" : ""
            }`}
            onClick={onTabChange.bind(this, category.id)}
          >
            {category.name}
            <span className="pl-2 pt-1">|</span>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <FullPage
      children={
        <div id="fullpage">
          <div className="section about-us">
            <div
              className={
                "pl-40 pr-20 flex flex-row justify-center items-center 2xl:px-20 2xl:pt-28 xl:pt-28 xl:px-16 sm:flex-col sm:px-5 lg:block md:block md:px-10 sm:h-auto sm:overflow-hidden md:h-auto lg:pt-29 lg:px-20 lg:h-auto md:pt-29"
              }
            >
              <div
                className={
                  "w-1/2 mr-16 lg:mr-0 lg:w-full md:w-full sm:w-full sm:mb-10 sm:m-0"
                }
                data-aos="fade-right"
              >
                <img
                  className={"h-auto object-cover w-full"}
                  src={getData(post._embedded, "image")}
                />
              </div>
              <div
                className={
                  "w-1/2 flex items-center lg:w-full md:w-full sm:w-full"
                }
                data-aos="fade-left"
              >
                <div className="h-full overflow-auto">
                  <h2
                    className={
                      "text-menuTextColor leading-8 font-bold text-2xl mb-10 lg:mt-10 sm:mb-3"
                    }
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />
                  </h2>
                  <div
                    className={
                      "careerDetails text-lg pr-20 sm:pr-0 lg:pr-0 md:pr-0 sm:text-base xl:pr-0 "
                    }
                    dangerouslySetInnerHTML={{
                      __html: post.content.rendered,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="section what-we-do project-info">
            <div className="sm:h-auto md:h-auto lg:h-auto lg:pb-10 sm:pt-0 h-body flex flex-col justify-center">
              <div className="text-center brands sm:px-8">
                <div className="heading-tag capitalize text-xl font-bold sm:text-lg sm:mt-0">
                  {__("What we do")}
                </div>
                <div className="heading-title capitalize text-5xl mt-2 mb-10 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
                  {__("Our services")}
                </div>
                {cats}
              </div>
              <div
                className={"px-20 2xl:px-20 xl:px-24 lg:px-20 md:px-10 sm:px-5"}
              >
                {renderWhatWeDo()}
              </div>
            </div>
          </div>
          <div className="section timeline odd">
            <div className="md:h-auto sm:h-auto 3xl:pt-28 2xl:pt-28 xl:pt-28">
              <div className="text-center brands sm:px-8">
                <div className="heading-title capitalize text-5xl mt-2 mb-10 3xl:mb-0 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1 2xl:mb-0">
                  {__("Our history")}
                </div>
              </div>
              <div className="px-40 relative 2xl:px-20 xl:px-24 lg:px-20 md:px-16 sm:px-8">
                <div className="history relative">
                  <Slider {...settings}>
                    {histories.map((history) => renderTimeline(history))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          <div className="section project-info footer">
            <Footer contact={contact} />
          </div>
        </div>
      }
    />
  );
};

About.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;

  const contact = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=235&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const posts = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=207&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const histories = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=209&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const categories = await fetcher(
    `${Config.apiUrl}/wp/v2/categories?parent=208&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { contact, posts, histories, categories };
};

export default About;
