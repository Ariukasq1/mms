import React from "react";
import Layout from "../components/layouts/Layout";
import ReactFullpage from "../lib/fullpage";
import mainStore from "../stores";
import ItemDetailsWithGallery from "../components/ItemDetailsWithGallery";
import { Config } from "../config";
import Slider from "react-slick";
import arrowImage from "../public/images/arrow-white.svg";
import { fetcher, getData, SampleNextArrow, SamplePrevArrow } from "../utils";
import SliderSubCategories from "../components/SliderSubCategories";

const renderProjects = (projects, post, language) => {
  return (projects || []).map((project) => {
    if (project.categories.length >= 2) {
      return null;
    }

    return (
      <div key={project.id}>
        <a
          href={`/portfolio/${post.slug}/detail/${project.slug}?lang=${language}#3`}
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
                  href={`/portfolio/${post.slug}/detail/${project.slug}?lang=${language}#3`}
                >
                  Read more
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

const Detail = ({ posts, detail, projects, projectDetails, materials }) => {
  const post = detail[0];
  const projectDetail = projectDetails[0];
  const { language } = mainStore();

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    rows: !post.content.rendered ? 2 : 2,
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

  const renderInteriorExterior = (item) => {
    const material = materials.filter((material) => material.id === item);
    const selectedMaterial = material[0];

    return (
      <div
        className={
          "flex flex-row  rounded-none overflow-hidden my-4 border border-solid border-menuTextColor bg-white material"
        }
      >
        <div className={"flex justify-center items-center round-img"}>
          <img
            className={"w-20 h-20 rounded-full m-4"}
            src={selectedMaterial.acf.image}
          />
        </div>
        <div className={"interiorTexts flex flex-col justify-center"}>
          <div className={"font-medium text-black"}>
            {selectedMaterial.name}
          </div>
          <div className={"mr-6 leading-6 sm:mr-2"}>
            {selectedMaterial.description}
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
        scrollOverflow={false}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage">
              <div className="section categories">
                <div className="capabilitiesPage">
                  <div className="capabilitiesPageSlider px-72 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-12">
                    <div className="brands">
                      <SliderSubCategories
                        data={posts}
                        querySlug="portfolio"
                        language={language}
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
                  <div className="desc mb-40">
                    <h4 className="mb-20">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                    </h4>
                    <p className="text-base">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.content.rendered,
                        }}
                      />
                    </p>
                  </div>
                  <div>
                    {projects.length > 8 ? (
                      <div className="brands pl-12 pr-32 project-slider">
                        <Slider {...settings}>{renderProjects}</Slider>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 px-10">
                        {renderProjects(projects, post, language)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="section project-details">
                <div className="projects-wrapper pl-32 xl:pl-32 lg:pl-32 md:pl-32 sm:px-24">
                  <div className="flex">
                    <div className="w-1/2 flex flex-col justify-center flex-center mr-16">
                      <b>
                        <span className="block">{post.title.rendered}</span>
                      </b>
                      <h4 className="mb-20">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: projectDetail.title.rendered,
                          }}
                        />
                      </h4>
                      <p className="text-base">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: projectDetail.content.rendered,
                          }}
                        />
                      </p>
                    </div>
                    <div className="w-1/2">
                      {Object.values(projectDetail.acf).length === 0 ? (
                        <img
                          className="object-cover object-center h-body w-full"
                          src={getData(projectDetail._embedded, "image")}
                          alt={projectDetail.title.rendered}
                        />
                      ) : (
                        <ItemDetailsWithGallery
                          images={Object.values(projectDetail.acf)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {projectDetail.acf.length !== 0 && (
                <div className="section portfolio-usage">
                  <div className="usage relative">
                    <div
                      className={
                        "px-72 flex flex-row justify-center xl:px-20 2xl:px-40 md:px-20 md:flex-col lg:px-20 sm:flex-col sm:px-10"
                      }
                    >
                      <div
                        className={
                          "w-1/2 flex flex-col mr-12 md:mr-2 md:ml-2 sm:mr-0"
                        }
                      >
                        <h2 className={"uppercase text-white"}>Interiors</h2>
                        {((projectDetail.acf || {}).interiors || []).map(
                          (interior) => {
                            return renderInteriorExterior(interior);
                          }
                        )}
                      </div>
                      <div
                        className={"w-1/2 flex flex-col ml-12 md:ml-2 sm:ml-0"}
                      >
                        <h2 className={"uppercase text-white"}>Exteriors</h2>
                        {((projectDetail.acf || {}).exteriors || []).map(
                          (exterior) => {
                            return renderInteriorExterior(exterior);
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      />
    </Layout>
  );
};

Detail.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;
  const parentSlug = ctx.query.parentSlug;
  const slug = ctx.query.slug;

  const posts = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=194&per_page=40${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${parentSlug}&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const catId =
    detail[0].categories.length !== 0 ? detail[0].categories[0] : 195;

  const projects = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=${catId}&per_page=40${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const projectDetails = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const materials = await fetcher(`${Config.apiUrl}/wp/v2/materials`);

  return { posts, detail, projects, projectDetails, materials };
};

export default Detail;
