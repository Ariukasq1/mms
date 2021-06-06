import React from "react";
import Layout from "../../components/layouts/Layout";
import Footer from "../../components/layouts/footer";
import { Config } from "../../config";
import { fetcher, getData, __, getLangParam } from "../../utils";
import Link from "next/link";
import FullPage from "../../components/FullPage";

const Index = ({ career, contact }) => {
  const currentLanguage = getLangParam();

  const renderValues = () => (
    <div className="px-72  xl:px-28 lg:px-20 md:px-10 sm:px-12">
      <div className="heading-tag capitalize text-xl font-bold sm:text-lg">
        {__("human resource")}
      </div>
      <div className="heading-title capitalize text-4xl mb-10 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
        {__("We put company culture first")}
      </div>
      <div className="grid grid-cols-4 gap-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
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
                query: { lang: currentLanguage },
              }}
              as={`/careers/${item.slug}?lang=${currentLanguage}#2`}
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
            <div className="section footer">
              <Footer contact={contact} />
            </div>
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
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const contact = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=235&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { career, contact };
};

export default Index;
