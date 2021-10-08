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
        className="cat-item bg-white lg:mb-5 md:mb-5 sm:mb-5 w-1/3 lg:w-full md:w-full"
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
            "capabilitiesPageBody truncate-2-lines text-base mt-4 sm:mt-0"
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
            className="my-4 text-base w-auto text-gradient font-normal hover:text-opacity-100 flex flex-row sm:my-4"
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
                <div className="capabilitiesPageSlider px-64 xl:px-32 md:pt-28 2xl:px-40 md:px-20 lg:px-24 sm:px-8 h-body overflow-auto">
                  <div className="brands">
                    <h2 className=" text-3xl font-bold mb-8 capitalize">
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
