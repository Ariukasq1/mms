import React from "react";
import { Tabs } from "antd";
import arrowImage from "../public/images/arrow-blue.svg";
import mainStore from "../stores";
import Link from "next/link";
import { __, getData } from "../utils";

const { TabPane } = Tabs;

const IndustryComponent = ({ industries }) => {
  const { language } = mainStore();

  if (!industries || industries.length === 0) {
    return null;
  }

  return (
    <div className="industry relative justify-between items-center">
      <div className="heading-tag capitalize text-xl font-bold pl-48 top-16 absolute sm:text-lg">
        {__("industries")}
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
                  className="title pl-48"
                  data-aos="fade-right"
                  data-aos-easing="ease-in"
                  data-aos-delay={i * 150}
                  data-aos-duration="2000"
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
                <div className="desc text-lg p-40 pr-32 text-white overflow-ellipsis overflow-hidden font-medium relative h-80 sm:text-base,w-full sm:px-16 sm:pr-8 md:w-full lg:w-3/4 xl:w-5/6">
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
      <Link href={{ pathname: `/[categories]`, query: { lang: language } }}>
        <a className="text-sm capitalize font-semibold rounded-full btn-gradient py-3 px-10 absolute bottom-16 ml-48">
          {__("Read more")}
        </a>
      </Link>
    </div>
  );
};

export default IndustryComponent;
