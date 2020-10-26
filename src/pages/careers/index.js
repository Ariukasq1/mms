import React from "react";
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import axios from "axios";
import { Config } from "../../config";
import { fetcher, getData } from "../../utils";

const Index = ({ career, jobs }) => {
  const post = career[0];
  const job = jobs[0];

  const renderHrFeatures = (item, index) => (
    <div className="p-4 mb-20 feature-item bg-white" key={index}>
      <div className="feature-icon mb-20">
        <img className="w-full h-full" src={item.image} />
      </div>
      <p className="font-semibold mb-10 text-lg">{item.title}</p>

      <p className={"text-sm leading-5"}>{item.description}</p>
    </div>
  );

  const renderJob = (item, index) => (
    <div key={index} className="flex items-center mb-8">
      <div className="w-12 mr-8">
        <img className={"h-12"} src={item.icon} />
      </div>
      <p className={"text-base"}>{item.text}</p>
    </div>
  );

  return (
    <Layout>
      <ReactFullpage
        navigationPosition={"left"}
        navigation
        paddingTop={"116px"}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage">
              <div className="section human-resource">
                <div className="px-40 auto-overflow">
                  <div className="header">
                    <h2>Human resource</h2>
                  </div>
                  <div className="grid grid-cols-4">
                    {Object.values(post.acf).map((item, index) =>
                      renderHrFeatures(item, index)
                    )}
                  </div>
                </div>
              </div>
              <div className="section odd careers">
                <div
                  className={"px-40 flex flex-row justify-center items-center"}
                >
                  <div className={"w-1/2 pr-20"}>
                    <div className="h-full w-full overflow-hidden">
                      <img
                        className="w-full object-cover"
                        src={getData(post._embedded, "image")}
                      />
                    </div>
                  </div>
                  <div className={"w-1/2 auto-overflow"}>
                    <h2 className={"mb-10 font-medium text-sm"}>#Careers</h2>
                    <h2 className={"mb-4 font-bold text-xl"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                    </h2>
                    <div className="content">
                      <div
                        className={"text-base pr-20"}
                        dangerouslySetInnerHTML={{
                          __html: post.content.rendered,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="section job">
                <div className={"px-40 flex flex-row"}>
                  <div className={"w-1/2"}>
                    <div
                      className="text-base"
                      dangerouslySetInnerHTML={{ __html: job.content.rendered }}
                    />
                  </div>
                  <div className={"w-1/2 pl-20"}>
                    <h2 className="text-xl font-semibold mb-40">
                      Ажил горилогч дараах материалуудыг бүрдүүлнэ:
                    </h2>
                    {Object.values(job.acf).map((item, index) =>
                      renderJob(item, index)
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

Index.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;

  const career = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=211&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  const jobs = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=212&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  return { career, jobs };
};

export default Index;
