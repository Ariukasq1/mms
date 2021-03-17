import React from "react";
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import { Config } from "../../config";
import mainStore from "../../stores";
import { fetcher, getData, __ } from "../../utils";
import Link from "next/link";
import FullPage from "../../components/FullPage";

const Index = ({ career }) => {
  const { language } = mainStore();
  // const post = career[0];
  // const job = jobs[0];

  // const renderJob = (item, index) => (
  //   <div key={index} className="flex items-center mb-8">
  //     <div className="w-12 mr-8">
  //       <img className={"h-12"} src={item.icon} />
  //     </div>
  //     <p className={"text-base"}>{item.text}</p>
  //   </div>
  // );

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

  return (
    <Layout>
      <FullPage
        children={
          <div id="fullpage career-page">
            <div className="section main-values">{renderValues()}</div>
            {/* <div className="section odd careers">
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
              </div> */}
          </div>
        }
      />
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang;

  const career = await fetcher(
    `${
      Config.apiUrl
    }/wp/v2/posts?_embed&categories=211&filter[orderby]=id&order=asc&${
      lang === "mn" ? "?lang=" + lang : ""
    }`
  );

  return { career };
};

export default Index;
