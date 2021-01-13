import React from "react";
import Link from "next/link";
import arrowImage from "../public/images/arrow.svg";
import Slider from "react-slick";
import { getData, sliderSettings, __ } from "../utils";

const SliderSubCategories = (props) => {
  const renderContent = props.data.map((category, index) => {
    if (
      (category.categories !== 0 &&
        category.categories.includes(194) &&
        category.acf &&
        category.acf.interiors) ||
      category.acf.exteriors
    ) {
      return null;
    }

    return (
      <div className="cat-item bg-white" key={index}>
        <div className="title text-black font-medium">
          {category.title.rendered}
        </div>
        <div className={"capabilitiesPageBody truncate-2-lines text-base mt-4"}>
          <div
            dangerouslySetInnerHTML={{
              __html: category.excerpt.rendered,
            }}
          />
        </div>
        <Link
          href={{
            pathname: `/[portfolio]/[item]`,
            query: { lang: props.language },
          }}
          as={`/${props.querySlug}/${category.slug}?lang=${props.language}#2`}
        >
          <a className="my-4 text-sm w-auto bg-transparent text-black hover:text-opacity-100 hover:text-menuTextColor flex flex-row sm:my-4">
            {__("Read more")}
            <img className="object-contain ml-4" src={arrowImage} />
          </a>
        </Link>
        <div>
          <Link
            href={{
              pathname: `/[portfolio]/[item]`,
              query: { lang: props.language },
            }}
            as={`/${props.querySlug}/${category.slug}?lang=${props.language}#2`}
          >
            <a>
              <div className="w-full image-wrapper">
                <img
                  src={getData(category._embedded, "image")}
                  alt={category.title.rendered}
                />
              </div>
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
    return <div className="flex without-scroll">{renderContent}</div>;
  }

  return (
    <Slider {...sliderSettings} className="h-full">
      {renderContent}
    </Slider>
  );
};

export default SliderSubCategories;
