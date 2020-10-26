import React from "react";
import Slider from "react-slick";
import moment from "moment";
import Layout from "../components/layouts/Layout";
import Footer from "../components/layouts/footer";
import ReactFullpage from "../lib/fullpage";
import { Config } from "../config";
import { fetcher, getData } from "../utils";

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

const About = ({ contact, posts, services, histories }) => {
  const post = posts[0];
  const service = services[0];

  const renderCards = (item) => {
    if (!item.image && !item.description) {
      return null;
    }

    return (
      <div className={" w-1/2 p-3 px-16 sm:w-full sm:px-2"}>
        <div className={"flex flex-row bg-white items-center p-5"}>
          <div className="image-background flex w-20 h-20 mr-4 rounded-full">
            <img
              className={"sm:w-16 sm:h-16 rounded-full w-20 h-20"}
              src={item.image}
            />
          </div>
          <p className={"ml-10 sm:ml-4 font-medium text-base m-0"}>
            {item.description}
          </p>
        </div>
      </div>
    );
  };

  const renderTimeline = (history) => {
    const { year } = history.acf;

    return (
      <div className="history-item">
        <h3>
          {moment(year).format("YYYY")}{" "}
          <span>{moment(year).format("MMM")}</span>
        </h3>
        <p className="text-center content text-base">
          <div dangerouslySetInnerHTML={{ __html: history.content.rendered }} />
        </p>
      </div>
    );
  };

  return (
    <Layout>
      <ReactFullpage
        navigationPosition={"left"}
        navigation
        scrollOverflow={true}
        paddingTop={"116px"}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage">
              <div className="section about-us">
                <div
                  className={
                    "pl-40 pr-20 flex flex-row justify-center items-stretch sm:flex-col sm:px-16"
                  }
                >
                  <div className={"w-1/2 mr-16"}>
                    <img
                      className={"h-auto object-cover w-full"}
                      src={getData(post._embedded, "image")}
                    />
                  </div>
                  <div className={" w-1/2 flex align-center"}>
                    <div>
                      <h2 className={"font-medium mb-8 text-xl"}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                      </h2>
                      <div
                        className={"careerDetails text-lg pr-20 sm:pr-0"}
                        dangerouslySetInnerHTML={{
                          __html: post.content.rendered,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="section what-we-do"
                style={{
                  backgroundImage: `url(${getData(
                    service._embedded,
                    "image"
                  )})`,
                }}
              >
                <div className="auto-overflow">
                  <div className={"px-48"}>
                    <h2 className={"text-white mb-8 text-xl font-medium"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: service.title.rendered,
                        }}
                      />
                    </h2>
                  </div>
                  <div className={"flex flex-wrap sm:flex-col px-32"}>
                    {Object.values(service.acf).map((item) =>
                      renderCards(item)
                    )}
                  </div>
                </div>
              </div>
              <div className="section timeline">
                <div className="px-40 relative">
                  <div className="history relative">
                    <Slider {...settings} className="h-full">
                      {histories.map((history) => renderTimeline(history))}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="section footer">
                <Footer data={contact} />
              </div>
            </div>
          );
        }}
      />
    </Layout>
  );
};

About.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;

  const contact = await fetcher(
    `${Config.apiUrl}/wp/v2/navigation_menus?slug=contact&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const posts = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=207&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const services = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=208&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const histories = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=209&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  return { contact, posts, services, histories };
};

export default About;
