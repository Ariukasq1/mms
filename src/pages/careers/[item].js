import React from "react";
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import { Config } from "../../config";
import mainStore from "../../stores";
import { fetcher, getData, __ } from "../../utils";
import Link from "next/link";
import { Collapse } from "antd";
import ItemDetailsWithGallery from "../../components/ItemDetailsWithGallery";
import FullPage from "../../components/FullPage";

const { Panel } = Collapse;

const renderCulture = (items, currentId, currentTitle) => {
  return items.map((item) => {
    if (item.id === currentId) {
      return null;
    }

    const renderContent = (item) => (
      <div className="flex">
        <div className="w-1/2">
          {!item.acf.image_1 ? (
            <img
              className="object-cover object-center h-body w-full"
              src={getData(item._embedded, "image")}
              alt={currentTitle}
            />
          ) : (
            <ItemDetailsWithGallery
              images={Object.entries(item.acf || {}).map(([key, value]) => {
                if (key.includes("group")) {
                  return null;
                }

                return value;
              })}
            />
          )}
        </div>
        <div className="w-1/2 p-20">
          <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
            {currentTitle}
          </div>
          <div className="heading-title capitalize text-5xl mt-4 mb-8 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
            <div dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
          </div>
          <div className="auto-overflow">
            <div
              className="text-base"
              dangerouslySetInnerHTML={{
                __html: item.content.rendered,
              }}
            />
          </div>
        </div>
      </div>
    );

    const renderDetails = () => {
      return item.slug.includes("1-1") ? (
        <div
          className="h-body object-cover relative  bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${getData(item._embedded, "image")})`,
          }}
        >
          <div className="bg-black opacity-40 absolute inset-0" />
          <div
            className="flex flex-col h-full items-center justify-center text-white z-1 relative"
            data-aos="zoom-in"
          >
            <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
              {currentTitle}
            </div>
            <div
              className="heading-title capitalize text-6xl mt-4 mb-8 px-64 font-bold sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1"
              style={{ lineHeight: "4rem" }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
            </div>
            <p className="text-2xl font-medium">
              <div
                dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
              />
            </p>
          </div>
        </div>
      ) : item.slug.includes("benefits") ? (
        <div className="benefits flex">
          <div className="w-1/2 flex flex-col flex-center pl-40 pr-20 py-20">
            <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
              {currentTitle}
            </div>
            <div className="heading-title capitalize text-5xl mt-4 mb-8 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
              <div dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
            </div>
            <div className="auto-overflow">
              <div
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: item.content.rendered,
                }}
              />
              <div className="grid gap-4 mt-8 grid-cols-4">
                {Object.values(item.acf).map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center text-center flex-col mb-6"
                    data-aos="zoom-in"
                    data-aos-easing="ease"
                    data-aos-delay={`${index * 250}`}
                    data-aos-duration="2000"
                    data-aos-offset="300"
                  >
                    <img className="mb-4" src={data.icon} alt="icon" />
                    <p className="text-base font-semibold leading-snug">
                      {data.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <img
              className="object-cover object-center h-body w-full"
              src={getData(item._embedded, "image")}
              alt={currentTitle}
            />
          </div>
        </div>
      ) : (
        renderContent(item)
      );
    };

    return (
      <div key={item.id} className={`section details`}>
        {renderDetails()}
      </div>
    );
  });
};

const renderVacancies = (items, currentId, currentTitle) => {
  return (
    <div className={`section vacancies`}>
      {items.map((item) => {
        if (item.id === currentId) {
          return null;
        }

        return (
          <div className="flex">
            <div className="w-1/2">
              {!item.acf.image_1 ? (
                <img
                  className="object-cover object-center h-body w-full"
                  src={getData(item._embedded, "image")}
                  alt={currentTitle}
                />
              ) : (
                <ItemDetailsWithGallery
                  images={Object.entries(item.acf || {}).map(([key, value]) => {
                    if (key.includes("group")) {
                      return null;
                    }

                    return value;
                  })}
                />
              )}
            </div>
            <div className="w-1/2 p-20">
              <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
                {currentTitle}
              </div>
              <div className="heading-title capitalize text-5xl mt-4 mb-8 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
                <div
                  dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                />
              </div>
              <div className="auto-overflow">
                <div
                  className="text-base"
                  dangerouslySetInnerHTML={{
                    __html: item.content.rendered,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderProcess = (items, currentId, currentTitle) => {
  return (
    <div className={`section vacancies item-detail`}>
      <div className="category-item">
        <div className="flex">
          <div className="w-1/2">
            <div
              className="item-image bg-cover bg-no-repeat h-body object-cover object-center cursor-pointer relative"
              style={{
                backgroundImage: `url(${getData(items[1]._embedded, "image")})`,
              }}
            >
              <div className="inner-content">
                <div className="inner-content-overlay absolute inset-0" />
                <div className="inner-content-detail text-white absolute">
                  <h2 className="block text-2xl font-bold capitalize text-white mb-4">
                    {items[1].title && items[1].title.rendered}
                  </h2>
                  <div className="auto-overflow mb-4">
                    <div
                      className="text-lg font-medium"
                      dangerouslySetInnerHTML={{
                        __html: items[1].content && items[1].content.rendered,
                      }}
                    />
                  </div>
                  <div className="divider block bg-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-20">
            <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
              {currentTitle}
            </div>
            <div className="heading-title capitalize text-5xl mt-4 mb-8 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
              <div
                dangerouslySetInnerHTML={{ __html: items[2].title.rendered }}
              />
            </div>
            <div className="auto-overflow">
              <div
                className="text-base"
                dangerouslySetInnerHTML={{
                  __html: items[2].content.rendered,
                }}
              />
              {items[2].acf.length !== 0 && (
                <div class="grid gap-4 grid-cols-2">
                  {Object.values(items[2].acf).map((data, index) => (
                    <div className="" key={index}>
                      <span className="gradient-text text-6xl leading-normal">
                        {index + 1}.
                      </span>
                      <h4 className="font-semibold text-xl mb-3">
                        {data.title}
                      </h4>
                      <p className="text-base">{data.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Item = ({ career, items, detail }) => {
  const { language } = mainStore();

  if (!detail || detail.length === 0) {
    return null;
  }

  const post = detail[0];

  const renderValues = () => (
    <div className="px-72 auto-overflow">
      <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
        {__("human resource")}
      </div>
      <div className="heading-title capitalize text-4xl mb-10 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
        {__("We put company culture first")}
      </div>
      <div className="grid grid-cols-4 gap-12">
        {career.map((item, index) => (
          <div
            key={item.id}
            className="bg-white pb-5"
            data-aos="fade-down"
            data-aos-easing="ease"
            data-aos-delay={`${index * 250}`}
            data-aos-duration="2000"
            data-aos-offset="300"
          >
            <Link
              href={{
                pathname: `/[careers]/[item]`,
                query: { lang: language },
              }}
              as={`/careers/${item.slug}?lang=${language}#2`}
            >
              <a>
                <div className="card">
                  <div className="bg-wrapper flex items-center justify-center">
                    <img src={getData(item._embedded, "image")} alt="image" />
                  </div>
                  <div className="content p-6">
                    <h4 className="font-semibold text-menuTextColor mb-3 text-lg">
                      {item.title.rendered}
                    </h4>

                    <p className={"text-base leading-5 mb-0"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.content.rendered,
                        }}
                      />
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFaq = () => {
    return (
      <div className="section faq">
        <div className="px-72">
          <b>
            <h3 className="mb-20 text-menuTextColor leading-8 font-bold text-xl">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.title.rendered,
                }}
              />
            </h3>
          </b>
          <Collapse defaultActiveKey={["2169"]} accordion>
            {items.map((item) => {
              if (item.id === post.id) {
                return null;
              }

              return (
                <Panel
                  key={item.id}
                  header={
                    <div
                      className="capitalize font-medium text-lg"
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    />
                  }
                >
                  <p>
                    <div
                      className="text-base"
                      dangerouslySetInnerHTML={{
                        __html: item.content.rendered,
                      }}
                    />
                  </p>
                </Panel>
              );
            })}
          </Collapse>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage career-page">
            <div className="section main-values">{renderValues()}</div>
            {post.slug === "faqs"
              ? renderFaq()
              : post.slug === "why-mms"
              ? renderCulture(items, post.id, post.title.rendered)
              : post.slug === "open-vacancy"
              ? renderVacancies(items, post.id, post.title.rendered)
              : post.slug === "selection-process"
              ? renderProcess(items, post.id, post.title.rendered)
              : null}
          </div>
        }
      />
    </Layout>
  );
};

Item.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;
  const slug = ctx.query.item;

  const career = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=211&filter[orderby]=id&order=asc&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const catId =
    detail[0].categories.length !== 0 ? detail[0].categories[0] : 228;

  const items = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=${catId}&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const jobs = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=212${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  return { career, jobs, detail, items };
};

export default Item;
