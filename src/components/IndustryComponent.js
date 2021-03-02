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
    <div className="industry flex flex-row justify-between items-center sm:flex-col">
      <div className="industryTexts pl-64 pr-40 xl:pl-24 lg:pr-12 lg:pl-24 sm:px-16 sm:pr-8 md:pl-24 md:pr-4 ">
        <div className="industryTag text-black font-bold sm:text-base mb-20">
          #{__("industries")}
        </div>
        <Tabs defaultActiveKey="1" tabPosition="left">
          {industries.map((item, i) => {
            if (!item.title.rendered) {
              return null;
            }

            return (
              <TabPane
                tab={
                  <div className="title">
                    {item.title.rendered}
                    <img className="image-icon" src={arrowImage} />
                  </div>
                }
                key={i}
              >
                <div
                  className="capabilitiesImage  md:pr-8"
                  style={{ flexBasis: "50%" }}
                >
                  <img
                    className="object-cover mb-8 xl:mb-8  sm:w-48 sm:m-auto sm:my-8 lg:w-3/4 lg:mb-8 xl:w-5/6"
                    src={getData(item._embedded, "image")}
                    alt="image"
                  />
                  <div className="desc text-lg sm:text-base,w-full sm:px-16 sm:pr-8 md:w-full lg:w-3/4 xl:w-5/6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.excerpt.rendered,
                      }}
                    />
                  </div>
                </div>
              </TabPane>
            );
          })}
        </Tabs>
        <Link href={{ pathname: `/[categories]`, query: { lang: language } }}>
          <a className="bg-transparent hover:bg-menuTextColor text-black text-sm font-semibold hover:text-white py-2 px-8 border border-menuTextColor hover:border-transparent rounded">
            {__("Read more")}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default IndustryComponent;
