import React from "react";
import { Tabs } from "antd";
import arrowImage from "../public/images/arrow-blue.svg";
import Link from "next/link";
import { __, getData, getLangParam } from "../utils";

const { TabPane } = Tabs;

const IndustryComponent = ({ industries }) => {
  const currentLanguage = getLangParam();

  if (!industries || industries.length === 0) {
    return null;
  }

  return (
    <div className="industry relative justify-between items-center">
      <div className="heading-tag capitalize text-2xl font-bold pl-48 top-16 absolute sm:text-lg xl:pl-28 lg:pl-24 md:pl-16 sm:pl-8">
        {__("Industries")}
      </div>
      <Tabs defaultActiveKey="0" tabPosition="left">
        {industries.map((item, i) => {
          if (!item.title.rendered) {
            return null;
          }

          return (
            <TabPane
              key={i}
              tab={
                <div
                  className="title pl-48 text-7xl xl:text-5xl xl:p-28 lg:text-5xl lg:p-24 md:text-4xl md:p-16 sm:text-4xl sm:pl-8"
                  data-aos="fade-right"
                  data-aos-easing="ease-in"
                  data-aos-delay={i * 150}
                  data-aos-duration={"2000"}
                  data-aos-offset="300"
                >
                  {item.title.rendered}
                  <img className="image-icon" src={arrowImage} />
                </div>
              }
            >
              <div
                className="w-full h-body relative md:pr-8"
                style={{
                  flexBasis: "50%",
                  backgroundImage: `url(${getData(item._embedded, "image")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="bg-black opacity-50 absolute inset-0" />
                <div className="desc text-lg p-40 pr-32 text-white overflow-ellipsis overflow-hidden font-medium relative h-80 sm:text-base,w-full sm:pl-16 sm:pr-10 sm:text-sm sm:py-8 md:w-full md:py-20 md:pl-16 md:pl-10 md:text-sm lg:w-9/10 lg:px-24 lg:py-40 xl:w-7/8">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.content.rendered,
                    }}
                  />
                </div>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
      <Link
        href={{ pathname: `/[categories]`, query: { lang: currentLanguage } }}
      >
        <a className="Industries-btn text-sm capitalize font-semibold rounded-full btn-gradient py-3 px-10 absolute bottom-16 ml-48 sm:ml-16 md:m-0">
          {__("Read more")}
        </a>
      </Link>
    </div>
  );
};

export default IndustryComponent;
