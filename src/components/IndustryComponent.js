import React from "react";
import { Tabs } from "antd";
import arrowImage from "../public/images/arrow-blue.svg";
import { __, getData, getLangParam } from "../utils";
import Link from "next/link";

const { TabPane } = Tabs;

const IndustryComponent = ({ industries }) => {
  const currentLanguage = getLangParam();

  if (!industries || industries.length === 0) {
    return null;
  }

  return (
    <div className="industry relative justify-between items-center">
      <div className="heading-tag capitalize text-2xl font-bold top-auto absolute ml-32 2xl:ml-28 xl:ml-24 lg:ml-10 lg:relative lg:mt-10 md:ml-5 sm:ml-5">
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
                  className="title text-6xl 2xl:text-5xl xl:text-4xl lg:text-5xl md:text-4xl sm:text-3xl"
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
                className="w-full h-body relative"
                style={{
                  backgroundImage: `url(${getData(item._embedded, "image")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="bg-black opacity-50 absolute inset-0" />
                <div className="desc text-lg p-20 pr-32 text-white overflow-ellipsis h-full font-medium relative w-full sm:px-5 sm:text-sm md:w-full md:p-10 md:text-sm lg:p-10 2xl:p-10 xl:p-12 xl:overflow-auto sm:py-5 overflow-ellipsis  sm:h-80 ">
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
      <Link href={`industries?lang=${currentLanguage}`}>
        <a className="Industries-btn text-sm capitalize font-semibold rounded-full btn-gradient py-3 px-10 absolute bottom-16 ml-32 2xl:ml-28 xl:ml-24 lg:ml-10 md:ml-5 sm:ml-5 ">
          {__("Read more")}
        </a>
      </Link>
    </div>
  );
};

export default IndustryComponent;
