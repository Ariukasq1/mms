import React from "react";
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import { Config } from "../../config";
import mainStore from "../../stores";
import { fetcher, getData, __ } from "../../utils";
import Link from "next/link";
import { Collapse } from "antd";
import ItemDetailsWithGallery from "../../components/ItemDetailsWithGallery";

const { Panel } = Collapse;

const renderSections = (items, currentId, currentTitle) => {
  return items.map((item) => {
    if (item.id === currentId) {
      return null;
    }

    const renderContent = (item) =>
      item.slug.includes("benefits") ? (
        <div className="px-32 flex flex-col mt-32 mr-16">
          <b>
            <span className="block text-lg mb-20">#{currentTitle}</span>
            <h3 className="mb-10 text-menuTextColor leading-8 font-bold text-xl">
              <div
                dangerouslySetInnerHTML={{
                  __html: item.title.rendered,
                }}
              />
            </h3>
          </b>
          <div className="auto-overflow benefits">
            <div
              className="text-base"
              dangerouslySetInnerHTML={{
                __html: item.content.rendered,
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="w-1/2 flex flex-col flex-center mt-32 mr-16">
            <b>
              <span className="block text-lg mb-20">#{currentTitle}</span>
              <h3 className="mb-10 text-menuTextColor leading-8 font-bold text-xl">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.title.rendered,
                  }}
                />
              </h3>
            </b>
            <div className="auto-overflow">
              <div
                className="text-base"
                dangerouslySetInnerHTML={{
                  __html: item.content.rendered,
                }}
              />
            </div>
          </div>
          <div className="w-1/2">
            {!item.acf.image_1 ? (
              <img
                className="object-cover object-center h-body w-full"
                src={getData(item._embedded, "image")}
                alt={currentTitle}
              />
            ) : (
              <ItemDetailsWithGallery images={Object.values(item.acf)} />
            )}
          </div>
        </>
      );

    const renderDetails = () => (
      <div className="px-40">
        <div className="flex">{renderContent(item)}</div>
      </div>
    );

    return (
      <div
        key={item.id}
        className={`section ${
          !item.slug.includes("benefits") && "odd"
        } details`}
      >
        {renderDetails()}
      </div>
    );
  });
};

const Item = ({ career, items, detail }) => {
  const { language } = mainStore();

  if (!detail || detail.length === 0) {
    return null;
  }

  const post = detail[0];

  const renderValues = () => (
    <div className="px-72 auto-overflow">
      <div className="header">
        <h2>{__("Human resource")}</h2>
      </div>
      <div className="grid grid-cols-4 gap-12">
        {career.map((item) => (
          <div key={item.id} className="bg-white pb-5">
            <Link
              href={{
                pathname: `/[careers]/[item]`,
                query: { lang: language },
              }}
              as={`/careers/${item.slug}?lang=${language}#2`}
            >
              <a>
                <div className="card">
                  <div className="bg-wrapper flex align-center justify-center">
                    <img src={getData(item._embedded, "image")} alt="image" />
                  </div>
                  <div className="content p-6">
                    <h4 className="font-semibold text-menuTextColor mb-10 text-lg">
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
      <ReactFullpage
        navigationPosition={"left"}
        navigation
        paddingTop={"116px"}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage career-page">
              <div className="section main-values">{renderValues()}</div>
              {post.slug === "faqs"
                ? renderFaq()
                : renderSections(items, post.id, post.title.rendered)}
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
