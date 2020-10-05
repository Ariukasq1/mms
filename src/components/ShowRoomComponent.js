import React from "react";
import { Tabs } from "antd";
import arrowImage from "../public/images/arrow.png";
import mainStore from "../stores";
import Link from "next/link";

const { TabPane } = Tabs;

const ShowRoomComponent = ({ data }) => {
  const items = Object.values(data.acf);
  // const url = item.image.url;
  const { language } = mainStore();
  console.log(items);

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
                  <Link
                    href={{
                      pathname: `${data.slug}`,
                      query: { lang: language },
                    }}
                  >
                    <a className="p-5 text-xs font-light text-gray-300 sm:p-2">
                      #Showroom
                    </a>
                  </Link>
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
                  src={item.image.url}
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
                  <Link
                    href={{
                      pathname: `${data.slug}`,
                      query: { lang: language },
                    }}
                  >
                    <a
                      className="ml-10 w-auto bg-transparent text-black text-base lowercase hover:text-menuTextColor flex flex-row sm:ml-8"
                      style={{ fontWeight: "bold" }}
                    >
                      read more
                      <img className="object-contain ml-4" src={arrowImage} />
                    </a>
                  </Link>
                </div>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );

  return (
    <div />
    //   <div className="showRoom ml-24 flex flex-row-reverse justify-start items-center sm:ml-10 sm:mr-1 sm:flex-row">
    //     <div
    //       className="showRoomTexts  pr-40 sm:pr-4 md:pr-16 lg:pr-12"
    //       style={{ flexBasis: "50%" }}
    //     >
    //       <div className="ml-20 showRoomTag text-black font-bold sm:ml-8 sm:text-base">
    //         #{data.slug}
    //       </div>
    //       <div className="ml-20 showRoomTitle text-3xl font-bold text-black leading-8 my-8 break-words sm:ml-8 sm:my-4 sm:text-2xl">
    //         {item.title}
    //       </div>
    //       <div
    //         className="ml-20 showRoomBody mb-8 text-black font-light text-lg sm:ml-8 sm:text-base"
    //         style={{
    //           fontSize: 16,
    //           fontWeight: "bold",
    //           lineHeight: -2,
    //           letterSpacing: -1,
    //           width: "62.6667%",
    //         }}
    //       >
    //         {item.body}
    //       </div>
    //       <Link href={{ pathname: `${data.slug}`, query: { lang: language } }}>
    //         <a
    //           className="ml-20 w-auto bg-transparent text-black text-base lowercase hover:text-menuTextColor flex flex-row sm:ml-8"
    //           style={{ fontWeight: "bold" }}
    //         >
    //           {item.button_label}
    //           <img className="object-contain ml-4" src={arrowImage} />
    //         </a>
    //       </Link>
    //       <div className="showRoomChildren flex flex-row ml-0 mt-20 lg:mt-10 sm:mt-8 sm:pr-0 sm:ml-8">
    //         {item.sub_categories.map((category, index) => (
    //           <div
    //             className="flex flex-col justify-between items-start text-white w-40 h-40 sm:w-24 sm:h-24"
    //             key={index}
    //             style={{ background: category.color }}
    //           >
    //             <Link
    //               href={{
    //                 pathname: `${data.slug}/${category.tag.slug}`,
    //                 query: { lang: language },
    //               }}
    //             >
    //               <a className="p-5 leading-4 text-base font-semibold sm:p-2 sm:text-sm">
    //                 {category.tag.name}
    //               </a>
    //             </Link>
    //             <Link
    //               href={{ pathname: `${data.slug}`, query: { lang: language } }}
    //             >
    //               <a className="p-5 text-xs font-light text-gray-300 sm:p-2">
    //                 #{item.tag}
    //               </a>
    //             </Link>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //     <div
    //       className="showRoomImage w-1/2 w-full h-body sm:hidden"
    //       style={{ flexBasis: "50%" }}
    //     >
    //       <img className="object-cover h-full w-full" src={url} />
    //     </div>
    //   </div>
  );
};

export default ShowRoomComponent;
