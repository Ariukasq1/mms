import React from "react";
import Link from "next/link";
import arrowImageBlue from "../../public/images/arrow-blue.svg";
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import { Config } from "../../config";
import Slider from "react-slick";
import arrowImage from "../../public/images/arrow-white.svg";
import {
  fetcher,
  __,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
  getLangParam,
} from "../../utils";

const SliderSubCategories = (props) => {
  const renderContent = props.data.map((post, index) => {
    if (
      (post.categories !== 0 &&
        post.categories.includes(194) &&
        post.acf &&
        post.acf.interiors) ||
      post.acf.exteriors
    ) {
      return null;
    }

    return (
      <div
        className="cat-item bg-white"
        key={index}
        data-aos="fade-down"
        data-aos-easing="ease"
        data-aos-delay={`${index * 300}`}
        data-aos-duration="2000"
        data-aos-offset="300"
      >
        <div className="title text-black font-medium">
          {post.title.rendered}
        </div>
        <div className={"capabilitiesPageBody truncate-2-lines text-base mt-4"}>
          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
        <Link
          href={{
            pathname: `/[portfolio]/[item]`,
            query: { lang: props.language },
          }}
          as={`/${props.querySlug}/${post.slug}?lang=${props.language}#2`}
        >
          <a className="my-4 text-base w-auto text-gradient font-normal hover:text-opacity-100 flex flex-row sm:my-4">
            {__("Read more")}
            <img className="object-contain w-10 ml-4" src={arrowImageBlue} />
          </a>
        </Link>
        <div>
          <Link
            href={{
              pathname: `/[portfolio]/[item]`,
              query: { lang: props.language },
            }}
            as={`/${props.querySlug}/${post.slug}?lang=${props.language}#2`}
          >
            <a>
              <div className="w-full image-wrapper">
                <img
                  src={getData(post._embedded, "image")}
                  alt={post.title.rendered}
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
    );
  });

  if (!props.data || props.data.length === 0) {
    return null;
  }

  return <div className="flex without-scroll">{renderContent}</div>;
};

const renderProjects = (projects, post, language) => {
  return (projects || []).map((project) => {
    if (project.categories.length >= 2) {
      return null;
    }

    return (
      <div key={project.id}>
        <a
          href={`/portfolio/${post.slug}/detail/${project.slug}?lang=${language}#4`}
        >
          <div
            className="project flex justify-center items-center row-span-2 col-span-1 relative"
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
                <a
                  className="readmore my-4 text-sm w-auto bg-transparent text-black hover:text-opacity-100 hover:text-menuTextColor flex flex-row sm:my-4"
                  href={`/portfolio/${post.slug}/detail/${project.slug}?lang=${language}#4`}
                >
                  {__("Read more")}
                </a>
                <img src={arrowImage} />
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  });
};

const Item = ({ posts, detail, projects }) => {
  const post = detail[0];
  const currentLanguage = getLangParam();

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
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  return (
    <Layout>
      <ReactFullpage
        navigationPosition={"left"}
        navigation
        paddingTop={"116px"}
        scrollOverflow={false}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage">
              <div className="section categories">
                <div className="capabilitiesPage">
                  <div className="capabilitiesPageSlider px-72 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-12">
                    <div className="brands">
                      <div className="header">
                        <h2>{__("Portfolio")}</h2>
                      </div>
                      <SliderSubCategories
                        data={posts}
                        querySlug="portfolio"
                        language={currentLanguage}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="pl-24 xl:pl-24 lg:pl-24 md:pl-24 sm:px-16">
                  <div className="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4 w-full">
                    <div className="flex flex-col mx-12 mt-20">
                      <h2
                        className="text-2xl capitalize font-bold text-menuTextColor mb-8"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                      <div
                        className="text-base"
                        dangerouslySetInnerHTML={{
                          __html: post.content.rendered,
                        }}
                      />
                    </div>
                    <div>
                      <img
                        className="object-cover object-center h-body w-full"
                        src={getData(post._embedded, "image")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="section projects"
                style={{
                  backgroundImage: `url(${getData(post._embedded, "image")})`,
                }}
              >
                <div className="projects-wrapper pl-32 xl:pl-32 lg:pl-32 md:pl-32 sm:px-24">
                  <div className="desc mb-10">
                    <h4 className="mb-5">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                    </h4>
                  </div>
                  <div>
                    {(projects || []).length > 8 ? (
                      <div className="brands pl-12 pr-32 project-slider">
                        <Slider {...settingsItems}>
                          {renderProjects(projects, post, currentLanguage)}
                        </Slider>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 px-10">
                        {renderProjects(projects, post, currentLanguage)}
                      </div>
                    )}
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

Item.getInitialProps = async (ctx) => {
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

  return { posts, detail, projects };
};

export default Item;
