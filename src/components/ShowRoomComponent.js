import React from "react";
import { Tabs } from "antd";
import arrowImage from "../public/images/arrow.svg";
import Link from "next/link";

const { TabPane } = Tabs;

const ShowRoomComponent = ({ data }) => {
  const items = Object.values(data.acf);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="showRoom ml-24 flex justify-start items-center sm:ml-10 sm:mr-1 sm:flex-row">
      <Tabs defaultActiveKey="1" tabPosition="right">
        {items.map((item, i) => {
          if (!item.title) {
            return null;
          }

          return (
            <TabPane
              tab={
                <>
                  <div className="sub-title p-5 leading-4 text-base font-semibold sm:p-2 sm:text-sm">
                    {item.title}
                  </div>
                  {/* <Link
                    href={{
                      pathname: `${data.slug}`,
                      query: { lang: currentLanguage },
                    }}
                  > */}
                  <a className="p-5 text-xs font-light text-gray-300 sm:p-2">
                    #Showroom
                  </a>
                  {/* </Link> */}
                </>
              }
              key={i}
            >
              <div
                className="showRoomImage w-1/2 w-full h-body sm:hidden"
                style={{ flexBasis: "50%" }}
              >
                <img
                  className="object-cover h-full w-full"
                  src={item.image && item.image}
                />
                <div className="tab-content mt-50">
                  <div className="ml-10 showRoomTag text-black font-bold sm:ml-8 sm:text-base">
                    #{data.slug}
                  </div>
                  <div className="ml-10 showRoomTitle text-3xl font-bold text-black leading-8 my-8 break-words sm:ml-8 sm:my-4 sm:text-2xl">
                    {item.title}
                  </div>
                  <div className="ml-10 showRoomBody mb-8 text-black font-light text-lg sm:ml-8 sm:text-base">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                  {/* <Link
                    href={{
                      pathname: `${data.slug}`,
                      query: { lang: currentLanguage },
                    }}
                  > */}
                  <a
                    className="ml-10 w-auto bg-transparent text-black text-base lowercase hover:text-menuTextColor flex flex-row sm:ml-8"
                    style={{ fontWeight: "bold" }}
                  >
                    read more
                    <img className="object-contain ml-4" src={arrowImage} />
                  </a>
                  {/* </Link> */}
                </div>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ShowRoomComponent;
