import React from "react";
import Link from "next/link";
import arrowImage from "../public/images/arrow.svg";
import Slider from "react-slick";
import { getData, sliderSettings } from "../utils";

const SliderSubCategories = (props) => {
  return (
    <Slider {...sliderSettings} className="h-full">
      {props.data.map((category, index) => {
        return (
          <div key={index}>
            <div className="title text-black font-medium">
              {category.title.rendered}
            </div>
            <p
              className={"capabilitiesPageBody truncate-2-lines text-base mt-4"}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: category.excerpt.rendered,
                }}
              />
            </p>
            <Link
              href={{
                pathname: `/[portfolio]/[item]`,
                query: { lang: props.language },
              }}
              as={`/${props.querySlug}/${category.slug}?lang=${props.language}#2`}
            >
              <a className="my-4 text-sm w-auto bg-transparent text-black hover:text-opacity-100 hover:text-menuTextColor flex flex-row sm:my-4">
                Read more
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
      })}
    </Slider>
  );
};

export default SliderSubCategories;
