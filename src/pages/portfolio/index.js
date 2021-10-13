import React from "react";
import arrowImage from "../../public/images/arrow-blue.svg";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import { fetcher, __, getData } from "../../utils";
import FullPage from "../../components/FullPage";
import Link from "next/link";

export const SliderSubCategories = (props) => {
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
        className="cat-item bg-white mx-5 xl:mx-2 md:mb-10 sm:mb-10 w-1/4 lg:w-full md:w-full sm:w-full lg:mx-0 md:mx-0 sm:mx-0"
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
        <div
          className={
            "capabilitiesPageBody truncate-2-lines text-base mt-4 sm:mt-0 2xl:mt-3"
          }
        >
          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <a
            className="my-4 text-base w-auto text-gradient font-normal hover:text-opacity-100 flex flex-row sm:my-4 2xl:my-2"
            style={{ display: "block" }}
            href={`/${props.querySlug}/${post.slug}?lang=${props.language}#section2`}
          >
            {__("Read more")}
          </a>
          <img className="object-contain w-10 ml-4" src={arrowImage} />
        </div>
        <div className="image">
          <Link
            href={{
              pathname: `/[portfolio]/[item]`,
              query: { lang: props.language },
            }}
            as={`/${props.querySlug}/${post.slug}?lang=${props.language}#section2`}
          >
            <a>
              <img
                className="h-full w-full object-cover"
                src={getData(post._embedded, "image")}
                alt={post.title.rendered}
              />
            </a>
          </Link>
        </div>
      </div>
    );
  });

  if (!props.data || props.data.length === 0) {
    return null;
  }

  return (
    <div className="flex without-scroll lg:grid lg:grid-cols-2 lg:gap-4 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
      {renderContent}
    </div>
  );
};

const Portfolio = (props) => {
  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage">
            <div className="section categories">
              <div className="capabilitiesPage">
                <div className="capabilitiesPageSlider px-32 pt-16 2xl:px-28 2xl:pt-28 xl:px-24 xl:pt-24 lg:px-20 lg:pt-28 md:pt-28 md:px-10 sm:px-5 sm:h-auto md:h-auto lg:h-auto">
                  <div className="brands">
                    <h2 className="ml-5 text-3xl font-bold mb-8 capitalize 2xl:mb-5 xl:mb-2 xl:ml-2 lg:ml-0 lg:mb-2 sm:m-0 md:m-0">
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
          </div>
        }
      />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const lang = ctx.query.lang;

  const posts = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=194&per_page=40&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { props: { posts, lang } };
};

export default Portfolio;
