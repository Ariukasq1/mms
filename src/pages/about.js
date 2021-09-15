import React from "react";
import Slider from "react-slick";
import moment from "moment";
import Layout from "../components/layouts/Layout";
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

const About = (props) => {
  const categories = props.categories;
  const [activeId, setactiveId] = React.useState(categories[0].id);
  const post = props.posts[0];

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
          className="about-detail-content w-full md:mb-10 sm:mb-10 "
        >
          <AboutDetail catId={activeId} />
        </div>
      );
    });
  };

  const renderTimeline = (history) => {
    const { year } = history.acf;

    return (
      <div className="history-item" key={history._id}>
        <h3>
          {moment(year).format("YYYY")}{" "}
          <span>{moment(year).format("MMM")}</span>
        </h3>
        <div className="text-center desc content text-base">
          <div dangerouslySetInnerHTML={{ __html: history.content.rendered }} />
        </div>
      </div>
    );
  };

  const cats = (
    <ul className="flex justify-center category-wrapper mb-20 xl:mb-10 sm:text-left sm:mb-10 2xl:mb-10">
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <li
            key={category.id}
            className={`text-lg sm:w-full font-medium p-2 ${
              activeId === category.id ? "active" : ""
            }`}
            onClick={onTabChange.bind(this, category.id)}
          >
            {category.name}
          </li>
          <span className="py-2 font-bold">/</span>
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage">
            <div className="section about-us">
              <div
                className={
                  "pl-40 pr-20 flex flex-row justify-center items-stretch sm:flex-col sm:pl-8 sm:pr-6 lg:block md:block md:pl-16 xl:pt-10"
                }
              >
                <div
                  className={
                    "w-1/2 mr-16 lg:mr-0 lg:w-full md:w-full sm:w-full sm:mb-10"
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
                    " w-1/2 flex items-center lg:w-full md:w-full sm:w-full"
                  }
                  data-aos="fade-left"
                >
                  <div>
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
                        "careerDetails text-lg pr-20 sm:pr-0 lg:pr-0 md:pr-0 sm:text-base"
                      }
                      dangerouslySetInnerHTML={{
                        __html: post.content.rendered,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="section what-we-do project-info ">
              <div className="xl:pt-10 2xl:pt-10">
                <div className="text-center brands sm:px-8">
                  <div className="heading-tag capitalize text-xl mt-20 font-bold sm:text-lg sm:mt-0 2xl:mt-25">
                    {__("What we do")}
                  </div>
                  <div className="heading-title capitalize text-5xl mt-2 mb-10 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
                    {__("Our services")}
                  </div>
                  {cats}
                </div>
                <div className={"px-32 xl:px-24 lg:px-20 md:px-10 sm:px-8"}>
                  {renderWhatWeDo()}
                </div>
              </div>
            </div>
            <div className="section timeline odd">
              <div className="text-center brands sm:px-8">
                <div className="heading-title capitalize text-5xl mt-2 mb-10 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
                  {__("Our history")}
                </div>
              </div>
              <div className="px-40 relative xl:px-24 lg:px-20 md:px-16 sm:px-8">
                <div className="history relative">
                  <Slider {...settings} className="h-full">
                    {props.histories.map((history) => renderTimeline(history))}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="section project-info footer">
              <Footer contact={props.contact} />
            </div>
          </div>
        }
      />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
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

  const services = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=208&${
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

  return { props: { contact, posts, services, histories, categories } };
};

export default About;
