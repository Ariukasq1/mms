import React from "react";
import arrowImage from "../../public/images/arrow-blue.svg";
import Layout from "../../components/layouts/Layout";
import { Config } from "../../config";
import { fetcher, __, getData, getLangParam } from "../../utils";
import FullPage from "../../components/FullPage";
import Link from "next/link";

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
            pathname: `/portfolio/[item]`,
            query: { lang: props.language },
          }}
          as={`/${props.querySlug}/${post.slug}?lang=${props.language}#2`}
        >
          <a className="my-4 text-base w-auto text-gradient font-normal hover:text-opacity-100 flex flex-row sm:my-4">
            {__("Read more")}
            <img className="object-contain w-10 ml-4" src={arrowImage} />
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

const Portfolio = ({ posts }) => {
  const currentLanguage = getLangParam();

  return (
    <Layout>
      <div className="relative">
        <FullPage
          children={
            <div id="fullpage">
              <div className="section categories">
                <div className="capabilitiesPage">
                  <div className="capabilitiesPageSlider px-64 xl:px-20 2xl:px-40 md:px-20 lg:px-24 sm:px-12">
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
            </div>
          }
        />
      </div>
    </Layout>
  );
};

Portfolio.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;

  const posts = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=194&per_page=40&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { posts };
};

export default Portfolio;
