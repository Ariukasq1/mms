import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { getData, sliderSettings, getLangParam } from "../utils";

const RelationSlider = ({ posts, items, querySlug, getCurrentItemId }) => {
  const currentLanguage = getLangParam();

  const renderItems = () => {
    const onClick = (postId) => {
      getCurrentItemId(postId);
    };

    return items.map((item) => {
      const post = posts.filter((post) => post.id === item)[0];

      if (!post || Object.keys(post).length === 0) {
        return null;
      }

      let href = `/${querySlug}/${post.slug}?lang=${currentLanguage}`;

      // if (querySlug !== "brands") {
      //   href = `/${querySlug}?lang=${currentLanguage}#section2`;
      // }

      if (querySlug === "brands") {
        return (
          <div key={post.id} className="brand-p-item mb-8">
            <Link href={href} passHref>
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
      }

      return (
        <div key={post.id} className="brand-p-item mb-8">
          <a
            href={`/${querySlug}?lang=${currentLanguage}#section2`}
            rel="noopener"
            onClick={() => onClick(post.id)}
          >
            <div className="font-medium text-black text-xl mb-4 title">
              <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </div>
            <div className="image-wrapper">
              <img src={getData(post._embedded, "image")} />
            </div>
          </a>
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
