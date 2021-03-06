import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { getData, sliderSettings, getLangParam } from "../utils";

const RelationSlider = ({ posts, items, querySlug }) => {
  const currentLanguage = getLangParam();

  const renderItems = () => {
    return items.map((item) => {
      const post = posts.filter((post) => post.id === item)[0];

      if (!post || Object.keys(post).length === 0) {
        return null;
      }

      return (
        <div key={post.id} className="brand-p-item mb-2 mr-5 sm:mr-0 2xl:mb-0">
          <Link
            href={`/${querySlug}/${post.slug}?lang=${currentLanguage}`}
            passHref
          >
            <a rel="noopener noreferer">
              <div className="font-medium text-black text-xl mb-1 title xl:mb-2 2xl:mb-1">
                <div
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </div>
              <div className="image-wrapper h-40 w-full xl:h-32 2xl:h-32">
                <img
                  className="h-full w-full object-cover"
                  src={getData(post._embedded, "image")}
                />
              </div>
            </a>
          </Link>
        </div>
      );
    });
  };

  if (items.length <= 4) {
    return (
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-1">
        {renderItems()}
      </div>
    );
  }

  return (
    <div className="justify-start items-start brands sm:ml-10 sm:mr-4">
      <Slider {...sliderSettings} className="h-full mb-12">
        {renderItems()}
      </Slider>
    </div>
  );
};

export default RelationSlider;
