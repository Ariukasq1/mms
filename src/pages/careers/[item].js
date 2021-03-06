import React from "react";
import Footer from "../../components/layouts/footer";
import { Config } from "../../config";
import { fetcher, getData, __, getLangParam } from "../../utils";
import { Collapse } from "antd";
import moment from "moment";
import ItemDetailsWithGallery from "../../components/ItemDetailsWithGallery";
import FullPage from "../../components/FullPage";
import { renderValues } from ".";

const { Panel } = Collapse;

const renderCulture = (items, currentId, currentTitle) => {
  return items.map((item) => {
    if (item.id === currentId) {
      return null;
    }

    const renderContent = (item) => (
      <div className="flex md:block sm:block lg:block h-body overflow-auto sm:h-auto md:h-auto lg:h-auto lg:mb-10">
        <div className="w-1/2 pt-10 pl-40 pr-20 3xl:pl-20 3xl:pr-16 2xl:pl-20 2xl:pr-10 md:w-full sm:w-full lg:w-full sm:pb-10 sm:pt-0 sm:px-5 md:p-10 xl:pl-20 xl:pr-6 lg:px-20 lg:mt-0">
          <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
            {currentTitle}
          </div>
          <div className="heading-title capitalize text-5xl mt-4 mb-8 xl:text-3xl sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
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
        <div className="w-1/2 md:w-full sm:w-full lg:w-full sm:mb-10">
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
      </div>
    );

    const renderDetails = () => {
      return item.slug.includes("1-1") ? (
        <div
          className="h-body object-cover relative bg-center bg-no-repeat bg-cover sm:h-86"
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
              className="heading-title text-center capitalize text-6xl mt-4 mb-8 px-64 font-bold xl:text-3xl sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1 md:px-20 sm:px-10 lg:px-20"
              style={{ lineHeight: "4rem" }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
            </div>
            <p className="text-2xl font-medium sm:px-10 text-center md:px-20">
              <div
                dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
              />
            </p>
          </div>
        </div>
      ) : item.slug.includes("benefits") ? (
        <div className="benefits flex md:block sm:block lg:block h-body overflow-auto sm:h-auto md:h-auto lg:h-auto lg:pb-10">
          <div className="w-1/2 flex flex-col flex-center pl-40 pr-20 pt-10 3xl:pl-20 3xl:pr-16 2xl:pl-20 2xl:pr-10 lg:px-20 md:w-full sm:w-full lg:w-full md:px-10 md:pb-10 sm:px-5 sm:pb-10 xl:pl-20 xl:pr-6 xl:pt-0 first-col xl:my-5">
            <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
              {currentTitle}
            </div>
            <div className="heading-title capitalize text-5xl mt-4 mb-8 xl:text-3xl  sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
              <div dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
            </div>
            <div className="overflow-auto xl:h-80 lg:h-auto">
              <div
                className="text-lg xl:text-base"
                dangerouslySetInnerHTML={{
                  __html: item.content.rendered,
                }}
              />
              <div className="grid gap-4 mt-8 grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
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
                    <img className="mb-4 icon-img" src={data.icon} alt="icon" />
                    <p className="text-base xl:text-sm font-semibold leading-snug">
                      {data.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/2 lg:w-full md:w-full sm:w-full h-full lg:h-auto sm:h-auto md:h-auto">
            <img
              className="object-cover object-center h-full w-full"
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

const renderJobs = (job, lang) => {
  return (
    <div
      key={job.id}
      className="relative job-item mb-8"
      style={{
        backgroundImage: `url(${getData(job._embedded, "image")})`,
      }}
    >
      <div className="content absolute p-5 bottom-0 right-0 left-0">
        <h4
          className={
            "text-base font-medium leading-5 text-white w-full flex items-end h-full overflow-hidden"
          }
        >
          {job.title.rendered}
        </h4>
        <i className="mb-10 date">{moment(job.date).format("ll")}</i>
      </div>
    </div>
  );
};

const renderVacancies = (items, currentId, currentTitle, jobs, lang) => {
  return (
    <div className={`section vacancies item-detail`}>
      {items.map((item) => {
        if (item.id === currentId) {
          return null;
        }

        return (
          <div className="category-item">
            <div className="flex md:block sm:block lg:block h-body md:overflow-auto sm:h-auto md:h-auto lg:h-auto lg:mb-10 md:mb-10 sm:mb-10">
              <div className="w-3/5 pr-20 pl-40 pt-10 3xl:pl-20 3xl:pr-16 2xl:pl-20 2xl:pr-10 md:w-full md:pb-5 sm:w-full lg:w-full sm:pt-0 sm:pb-10 sm:px-5 md:px-10 xl:pl-20 xl:pr-6 lg:px-20">
                <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
                  {currentTitle}
                </div>
                <div className="2xl:h-80 2xl:overflow-auto xl:h-72 xl:overflow-auto sm:h-auto lg:h-auto md:h-auto">
                  <div className="flex flex-wrap md:flex-nowrap md:mt-5 sm:flex-nowrap">
                    {jobs.map((job) => renderJobs(job, lang))}
                  </div>
                </div>
              </div>
              <div className="w-2/5 md:w-full sm:w-full lg:w-full">
                <div
                  className="item-image bg-cover bg-no-repeat h-body object-cover object-center relative sm:h-86"
                  style={{
                    backgroundImage: `url(${getData(item._embedded, "image")})`,
                  }}
                >
                  <div className="inner-content">
                    <div className="inner-content-overlay absolute inset-0" />
                    <div className="inner-content-detail text-white absolute">
                      <h2 className="block text-2xl font-bold capitalize text-white mb-4">
                        {item.title && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.title.rendered,
                            }}
                          />
                        )}
                      </h2>
                      <div className="auto-overflow mb-4 lg:w-1/2 md:w-full sm:w-full">
                        <div
                          className="text-lg font-medium"
                          dangerouslySetInnerHTML={{
                            __html: item.content && item.content.rendered,
                          }}
                        />
                      </div>
                      <div className="divider block bg-white" />
                    </div>
                  </div>
                </div>
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
        <div className="flex md:block sm:block lg:block h-body md:overflow-auto lg:h-auto lg:mb-10 sm:h-auto md:h-auto md:mb-10 sm:mb-10">
          <div className="w-1/2 pl-40 pr-20 pt-10 3xl:pl-20 3xl:pr-16 2xl:pl-20 2xl:pr-10 xl:pl-20 xl:pr-6 lg:w-full md:w-full sm:w-full md:pt-10 md:px-10 md:pb-5 sm:p-5 lg:px-20">
            <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
              {currentTitle}
            </div>
            <div className="heading-title capitalize text-5xl mt-4 mb-8 xl:text-3xl md:text-4xl sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
              <div
                dangerouslySetInnerHTML={{ __html: items[2].title.rendered }}
              />
            </div>
            <div className="career-scroll xl:h-56 xl:overflow-auto md:h-auto lg:overflow-auto lg:h-auto 2xl:h-72 2xl:overflow-auto">
              <div
                className="text-base md:text-sm"
                dangerouslySetInnerHTML={{
                  __html: items[2].content.rendered,
                }}
              />
              {items[2].acf.length !== 0 && (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-1">
                  {Object.values(items[2].acf).map((data, index) => {
                    if (!data) {
                      return null;
                    }

                    return (
                      <div className="" key={index}>
                        <span className="gradient-text text-6xl leading-normal xl:text-5xl md:text-4xl sm:text-3xl">
                          {index + 1}.
                        </span>
                        <h4 className="font-semibold text-xl mb-3 xl:text-base md:text-base sm:text-base">
                          {data.title}
                        </h4>
                        <p className="text-base xl:text-sm md:text-sm sm:text-sm">
                          {data.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2 lg:w-full md:w-full sm:w-full h-body">
            <div
              className="item-image bg-cover bg-no-repeat h-full object-cover object-center cursor-pointer relative"
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
        </div>
      </div>
    </div>
  );
};

const Item = ({ career, jobs, detail, items, contact, lang }) => {
  const currentLanguage = getLangParam();

  if (!detail || detail.length === 0) {
    return null;
  }

  const post = detail[0];

  const renderFaq = () => {
    return (
      <div className="section faq">
        <div className="px-40 xl:px-24 2xl:pt-28 2xl:px-20 xl:pt-28 lg:px-20 md:px-10 sm:px-8 sm:h-auto md:h-auto lg:h-auto lg:mb-10 md:mb-10 sm:mb-10">
          <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
            {__("Human Resource")}
          </div>
          <div className="heading-title capitalize text-5xl xl:text-3xl sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
            <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </div>
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
    <FullPage
      children={
        <div id="fullpage career-page">
          <div className="section main-values">
            {renderValues(career, currentLanguage)}
          </div>
          {post.slug === "faqs"
            ? renderFaq()
            : post.slug === "why-mms"
            ? renderCulture(items, post.id, post.title.rendered)
            : post.slug === "open-vacancy"
            ? renderVacancies(items, post.id, post.title.rendered, jobs, lang)
            : post.slug === "selection-process"
            ? renderProcess(items, post.id, post.title.rendered)
            : null}
          <div className="section footer">
            <Footer contact={contact} />
          </div>
        </div>
      }
    />
  );
};

Item.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;
  const slug = ctx.query.item;

  const career = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=211&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const contact = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=235&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const detail = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&slug=${slug}&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const catId =
    detail.length > 0 && detail[0].categories.length > 0
      ? detail[0].categories[0]
      : 228;

  const items = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=${catId}&filter[orderby]=id&order=asc&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const jobs = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=949&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { career, jobs, detail, items, contact, lang };
};

export default Item;
