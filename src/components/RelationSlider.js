import React from "react";
import Slider from "react-slick";
import mainStore from "../stores";
import Link from "next/link";
import { getData, sliderSettings } from "../utils";

const RelationSlider = ({ posts, items, querySlug }) => {
  const renderItems = () => {
    const { language } = mainStore;

    return items.map((item) => {
      const post = posts.filter((post) => post.id === item)[0];

      if (!post || Object.keys(post).length === 0) {
        return null;
      }

      return (
        <div key={post.id} className="brand-p-item mb-8">
          <Link
            href={{
              pathname: `/[portfolio]/[item]`,
              query: { lang: language },
            }}
            as={`/${querySlug}/${post.slug}?lang=${language}#2`}
          >
            <a rel="noopener">
              <div className="font-medium text-black text-xl mb-4 title">
                <div
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </div>
              <div className="image-wrapper">
                <img src={getData(post._embedded, "image")} />
              </div>
            </a>
          </Link>
        </div>
      );
    });
  };

  if (items.length <= 4) {
    return <div className="grid grid-cols-4 gap-4 px-4">{renderItems()}</div>;
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
