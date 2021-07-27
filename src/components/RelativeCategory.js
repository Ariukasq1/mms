import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import { getLangParam } from "../utils";

const settings = {
  className: "center",
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  rows: 1,
  arrows: true,
  slidesPerRow: 1,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const RelativeCategory = ({ category, child, querySlug }) => {
  const currentLanguage = getLangParam();

  const renderCategories = child.map((data, index) => {
    const cat = data.acf;
    const image = cat.thumbnail_image;
    const observer = lozad();
    observer.observe();
    return (
      <div key={index}>
        <div className={"flex flex-col"}>
          <Link
            href={{
              pathname: `${category.slug}/${data.slug}`,
              query: { lang: currentLanguage },
            }}
          >
            <a>
              <div className={"text-xl mb-4 text-black font-medium"}>
                {data.name}
              </div>
            </a>
          </Link>
          <div className="w-full" style={{ height: 250 }}>
            <img
              data-src={image.url}
              className="object-cover w-full lozad"
              alt={image.alt}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className="justify-start items-start brands mb-10 sm:ml-10 sm:mr-4"
      style={{ backgroundColor: "white" }}
    >
      <div className="ml-4 my-8 font-medium text-3xl text-black sm:mb-8">
        {category.name}
      </div>
      <Slider {...settings}>{renderCategories}</Slider>
    </div>
  );
};

export default RelativeCategory;
