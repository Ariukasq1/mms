import React from "react";
import Link from "next/link";
import { __, getData, getLangParam } from "../utils";

const CapabilitiesComponent = ({ data }) => {
  const currentLanguage = getLangParam();
  const observer = lozad();
  observer.observe();
  return (
    <div className="capabilities flex flex-row-reverse xl:flex-row sm:flex-col justify-between items-center">
      <div
        className="capabilitiesTexts px-32 py-8 xl:pr-10 xl:pl-24 lg:pr-10 lg:pl-24 md:pl-24 md:pr-4 sm:px-8 sm:pt-0 bg-white"
        data-aos="fade-up"
        ata-aos-easing="ease"
        data-aos-delay={`0`}
        style={{ flexBasis: "50%" }}
      >
        <div className="heading-tag capitalize text-3xl font-bold mb-10 sm:text-lg sm:mb-5">
          {__("Capabilities")}
        </div>
        <div className="capabilitiesBody mb-10 text-lg ">
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>
          <a href={`capabilities?lang=${currentLanguage}`} className="text-sm capitalize font-semibold rounded-full btn-gradient py-3 px-10">
            {__("Read more")}
          </a>
      </div>
      <div
        className="capabilitiesImage w-full h-body"
        style={{ flexBasis: "50%" }}
      >
        <img
          className="object-cover h-full w-full lozad"
          data-src={getData(data._embedded, "image")}
        />
      </div>
    </div>
  );
};

export default CapabilitiesComponent;
