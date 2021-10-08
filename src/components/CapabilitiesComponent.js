import React from "react";
import Link from "next/link";
import { __, getData, getLangParam } from "../utils";

const CapabilitiesComponent = ({ data }) => {
  const currentLanguage = getLangParam();

  return (
    <div className="flex flex-row-reverse justify-between items-center sm:flex-col md:flex-col">
      <div
        className="capabilitiesTexts px-32 py-8 bg-white xl:py-0 xl:px-10 lg:py-0 lg:px-5 md:px-5 sm:px-5"
        data-aos="fade-up"
        ata-aos-easing="ease"
        data-aos-delay={`0`}
        style={{ flexBasis: "50%" }}
      >
        <div className="heading-tag capitalize text-3xl font-bold mb-10 lg:mb-8">
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
      <div className="w-full h-body" style={{ flexBasis: "50%" }}>
        <img
          className="object-cover h-full w-full"
          src={getData(data._embedded, "image")}
        />
      </div>
    </div>
  );
};

export default CapabilitiesComponent;
