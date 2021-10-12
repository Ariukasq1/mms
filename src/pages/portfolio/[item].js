import React from "react";
import Link from "next/link";
import arrowImageBlue from "../../public/images/arrow-blue.svg";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import Slider from "react-slick";
import arrowImage from "../../public/images/arrow-white.svg";
import {
  fetcher,
  __,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
} from "../../utils";
import FullPage from "../../components/FullPage";
import { SliderSubCategories } from "./index";

export const renderProjects = (projects, post, language) => {
  return (projects || []).map((project) => {
    if (project.categories.length >= 2) {
      return null;
    }

    return (
      <div key={project.id}>
        <a
          href={`/portfolio/${post.slug}/detail/${project.slug}?lang=${language}#section4`}
        >
          <div
            className="project flex items-center row-span-2 col-span-1 relative h-56 xl:h-48 bg-no-repeat bg-cover bg-center 2xl:h-40"
            style={{
              backgroundImage: `url(${getData(project._embedded, "image")})`,
            }}
          >
            <div className="content">
              <h4>
                <div
                  dangerouslySetInnerHTML={{ __html: project.title.rendered }}
                />
              </h4>
              <div className="flex items-center more">
                <Link
                  href={`/portfolio/${post.slug}/detail/${project.slug}?lang=${language}#section4`}
                >
                  <a className="readmore my-4 text-sm w-auto bg-transparent text-black hover:text-opacity-100 hover:text-menuTextColor flex flex-row sm:my-4">
                    {__("Read more")}
                  </a>
                </Link>
                <img src={arrowImage} />
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  });
};

export const projectInfo = (post) => {
  return (
    <div className="pl-24 xl:pl-12 lg:pl-0 md:pl-0 sm:pl-0 h-body overflow-auto sm:h-auto md:h-auto">
      <div className="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4 w-full h-full lg:block md:block sm:block sm:h-auto">
        <div className="flex flex-col mx-12 lg:pl-12 lg:mr-2 lg:mt-5 sm:mx-5 lg:mb-5 md:mx-10 2xl:mt-0 3xl:mt-5 h-full overflow-auto lg:h-auto md:h-auto sm:h-auto">
          <h2
            className="text-2xl capitalize font-bold text-menuTextColor mb-8 xl:mb-1 2xl:mb-2"
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />
          <div
            className="text-base xl:text-tiny"
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
        </div>
        <div>
          <img
            className="object-cover object-center portfolio-h-body lg:px-20 md:px-10 sm:px-5 h-full"
            src={getData(post._embedded, "image")}
          />
        </div>
      </div>
    </div>
  );
};

const Item = (props) => {
  const post = props.detail[0];

  if (Object.keys(post).length !== 0) {
    typeof window !== "undefined" &&
      window.fullpage_api &&
      window.fullpage_api.moveTo(2, 0);
  }

  const settingsItems = {
    infinite: true,
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
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage">
            <div className="section categories">
              <div className="capabilitiesPage">
                <div className="capabilitiesPageSlider px-32 pt-16 2xl:px-28 2xl:pt-28 xl:px-24 xl:pt-24 md:px-10 lg:px-24 sm:px-5 md:h-auto sm:h-auto">
                  <div className="brands">
                    <h2 className="ml-5 text-3xl font-bold mb-8 2xl:mb-5 xl:mb-2 capitalize">
                      {__("Portfolio")}
                    </h2>
                    <SliderSubCategories
                      data={props.posts}
                      querySlug="portfolio"
                      language={props.lang}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="section project-info">{projectInfo(post)}</div>
            <div
              className="section projects"
              style={{
                backgroundImage: `url(${getData(post._embedded, "image")})`,
              }}
            >
              <div className="projects-wrapper pl-32 2xl:pt-28 xl:pl-32 xl:pr-5 md:px-10 lg:pl-16 sm:px-8 sm:h-auto sm:overflow-hidden sm:pb-16 md:h-auto md:overflow-hidden md:pb-16">
                <div className="desc mb-10 xl:mb-5 sm:mb-5">
                  <h4 className="mb-5">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />
                  </h4>
                </div>
                <div>
                  {(props.projects || []).length > 8 ? (
                    <div className="brands pl-12 pr-32 xl:pl-0 2xl:pl-0 project-slider lg:pl-0 lg:pr-5 xl:px-0 md:px-0 sm:pl-0 sm:pr-0">
                      <Slider {...settingsItems}>
                        {renderProjects(props.projects, post, props.lang)}
                      </Slider>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 px-10 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 sm:pl-0 sm:pr-5">
                      {renderProjects(props.projects, post, props.lang)}
                    </div>
                  )}
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
  const slug = ctx.query.item;

  const posts = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=194&per_page=20&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const catId =
    detail[0].categories.length !== 0 ? detail[0].categories[0] : 195;

  const projects = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=${catId}&per_page=20&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { props: { posts, detail, projects, lang } };
};

export default Item;
