import React from "react";
import Link from "next/link";
import arrowImage from "../public/images/arrow-blue.svg";
import Slider from "react-slick";
import { getData, sliderSettings, __ } from "../utils";

const SliderSubCategories = (props) => {
  const renderContent = props.data.map((post, index) => {
    if (
      (post.categories !== 0 &&
        post.categories.includes(194) &&
        post.acf &&
        post.acf.interiors) ||
      post.acf.exteriors
    ) {
      return null;
    }

    return (
      <div
        className="cat-item bg-white md:mb-10 sm:mb-10"
        key={index}
        data-aos="fade-down"
        data-aos-easing="ease"
        data-aos-delay={`${index * 300}`}
        data-aos-duration="2000"
        data-aos-offset="300"
      >
        <div
          className="title text-black font-medium"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div
          className={
            "capabilitiesPageBody truncate-2-lines text-base mt-4 sm:mt-1"
          }
        >
          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <a
            className="my-4 text-base w-auto text-gradient font-normal hover:text-opacity-100 flex flex-row sm:my-4"
            href={`/${props.querySlug}/${post.slug}?lang=${props.language}#section2`}
            style={{ display: "block" }}
          >
            {__("Read more")}
          </a>
          <img className="object-contain w-10 ml-4" src={arrowImage} />
        </div>
        <div className="image h-64">
          <Link
            href={`/${props.querySlug}/${post.slug}?lang=${props.language}#section2`}
          >
            <a>
              <img
                className="h-full object-cover"
                src={getData(post._embedded, "image")}
                alt={post.title.rendered}
              />
            </a>
          </Link>
        </div>
      </div>
    );
  });

  if (!props.data || props.data.length === 0) {
    return null;
  }

  if (props.data.length <= 4) {
    return (
      <div className="flex without-scroll lg:grid lg:grid-cols-2 lg:gap-4 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
        {renderContent}
      </div>
    );
  }

  return (
    <Slider {...sliderSettings} className="h-full">
      {renderContent}
    </Slider>
  );
};

export default SliderSubCategories;
