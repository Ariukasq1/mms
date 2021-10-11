import React from "react";
import Link from "next/link";
import { __, getData, getLangParam } from "../utils";

const CapabilitiesComponent = ({ data }) => {
  const currentLanguage = getLangParam();

  return (
    <div className="flex flex-row-reverse justify-between items-center h-body lg:flex-col sm:flex-col md:flex-col lg:h-auto sm:h-auto md:h-auto ">
      <div
        className="capabilitiesTexts px-32 py-8 bg-white 2xl:px-20 xl:py-0 xl:px-16 lg:p-10 md:p-5 sm:p-5"
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
      <div className="h-full w-full" style={{ flexBasis: "50%" }}>
        <img
          className="object-cover h-full w-full"
          src={getData(data._embedded, "image")}
        />
      </div>
    </div>
  );
};

export default CapabilitiesComponent;
