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
      <div className="heading-tag capitalize text-2xl font-bold absolute ml-40 2xl:ml-28 xl:ml-24 lg:ml-10 lg:relative lg:mt-10 md:ml-5 sm:ml-5">
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
                  className="title text-7xl 3xl:text-6xl 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl"
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
                className="w-full h-body relative flex sm:h-86"
                style={{
                  backgroundImage: `url(${getData(item._embedded, "image")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="bg-black opacity-50 absolute inset-0" />
                <div className="desc relative flex items-center text-lg text-white h-full w-full font-medium px-32 3xl:px-16 sm:px-5 sm:text-sm md:w-full md:p-10 md:text-sm lg:p-10 2xl:p-10 xl:px-12  sm:py-20 overflow-ellipsis sm:h-80 ">
                  <div
                    className="xl:h-72 xl:overflow-auto"
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
        <a className="Industries-btn text-sm capitalize font-semibold rounded-full btn-gradient py-3 px-10 absolute ml-40 2xl:ml-28 xl:ml-24 lg:ml-10 md:ml-5 sm:ml-5 ">
          {__("Read more")}
        </a>
      </Link>
    </div>
  );
};

export default IndustryComponent;
