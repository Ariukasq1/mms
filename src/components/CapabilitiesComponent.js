import React from "react";
import Link from "next/link";
import mainStore from "../stores";
import { __, getData } from "../utils";

const CapabilitiesComponent = ({ data }) => {
  const { language } = mainStore();

  return (
    <div className="capabilities flex xl:flex-row sm:flex-col justify-between items-center">
      <div
        className="capabilitiesTexts pr-32 xl:pr-10 xl:pl-24 lg:pr-10 lg:pl-24 md:pl-24 md:pr-4 sm:px-16 sm:pr-8 bg-white"
        data-aos="fade-up"
        style={{ flexBasis: "50%", paddingLeft: "14rem" }}
      >
        <div className="capabilitiesTag text-black font-bold sm:text-base">
          #{__("capabilities")}
        </div>
        <div className="capabilitiesTitle text-4xl font-bold text-menuTextColor leading-8 my-8 sm:text-2xl sm:leading-7 sm:my-4 sm:mt-1">
          <div dangerouslySetInnerHTML={{ __html: data.title.rendered }} />
        </div>
        <div className="capabilitiesBody mb-8 text-lg sm:text-base">
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>
        <Link
          href={{ pathname: `/[categories]`, query: { lang: language } }}
          as={`capabilities?lang=${language}`}
        >
          <a className="bg-transparent hover:bg-menuTextColor text-black text-lg font-semibold hover:text-white py-2 px-4 border border-menuTextColor hover:border-transparent rounded">
            {__("Read more")}
          </a>
        </Link>
      </div>
      <div
        className="capabilitiesImage w-full h-body sm:hidden"
        style={{ flexBasis: "50%" }}
      >
        <img
          className="object-cover h-full w-full"
          src={getData(data._embedded, "image")}
        />
      </div>
    </div>
  );
};

export default CapabilitiesComponent;
