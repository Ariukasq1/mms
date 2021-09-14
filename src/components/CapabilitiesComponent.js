import React from "react";
import Link from "next/link";
import { __, getData, getLangParam } from "../utils";

const CapabilitiesComponent = ({ data }) => {
  const currentLanguage = getLangParam();

  return (
    <div className="flex flex-row-reverse justify-between items-center xl:pt-28 sm:flex-col">
      <div
        className="capabilitiesTexts px-32 py-8 bg-white xl:pr-10 xl:pl-24 lg:pr-10 lg:pl-24 md:pl-20 md:pr-10 sm:px-8 sm:pt-0"
        data-aos="fade-up"
        ata-aos-easing="ease"
        data-aos-delay={`0`}
        style={{ flexBasis: "50%" }}
      >
        <div className="heading-tag capitalize text-3xl font-bold mb-10">
          {__("Capabilities")}
        </div>
        <div className="capabilitiesBody mb-10 text-lg ">
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>
        <Link href={`capabilities?lang=${currentLanguage}`}>
          <a className="text-sm capitalize font-semibold rounded-full btn-gradient py-3 px-10">
            {__("Read more")}
          </a>
        </Link>
      </div>
      <img
        className="w-full h-body"
        src={getData(data._embedded, "image")}
        style={{ flexBasis: "50%" }}
      />
    </div>
  );
};

export default CapabilitiesComponent;
