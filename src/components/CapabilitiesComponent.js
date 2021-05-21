import React from "react";
import Link from "next/link";
import mainStore from "../stores";
import { __, getData } from "../utils";

const CapabilitiesComponent = ({ data }) => {
  const { language } = mainStore();

  return (
    <div className="capabilities flex flex-row-reverse xl:flex-row sm:flex-col justify-between items-center">
      <div
        className="capabilitiesTexts px-32 py-8 xl:pr-10 xl:pl-24 lg:pr-10 lg:pl-24 md:pl-24 md:pr-4 sm:px-16 sm:pr-8 bg-white"
        data-aos="fade-up"
        ata-aos-easing="ease"
        data-aos-delay={`0`}
        style={{ flexBasis: "50%" }}
      >
        <div className="heading-tag capitalize text-3xl font-bold mb-10 sm:text-lg">
          {__("capabilities")}
        </div>
        <div className="capabilitiesBody mb-10 text-lg sm:text-base">
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>
        <Link
          href={{ pathname: `/[categories]`, query: { lang: language } }}
          as={`capabilities?lang=${language}`}
        >
          <a className="text-sm capitalize font-semibold rounded-full btn-gradient py-3 px-10">
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
