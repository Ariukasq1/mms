import React from "react";
import Link from "next/link";
import arrowImage from "../public/images/arrow-blue.svg";
import Slider from "react-slick";
import { getData, sliderSettings, __ } from "../utils";

const SliderSubCategories = (props) => {
  const onClick = (postId) => {
    props.getCurrentItemId(postId, props.fullPageApi);
  };

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
        className="cat-item bg-white"
        key={index}
        data-aos="fade-down"
        data-aos-easing="ease"
        data-aos-delay={`${index * 300}`}
        data-aos-duration="2000"
        data-aos-offset="300"
      >
        <div className="title text-black font-medium">
          {post.title.rendered}
        </div>
        <div className={"capabilitiesPageBody truncate-2-lines text-base mt-4"}>
          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
        <a
          className="my-4 text-base w-auto text-gradient font-normal hover:text-opacity-100 flex flex-row sm:my-4"
          onClick={onClick.bind(this, post.id)}
        >
          {__("Read more")}
          <img className="object-contain w-10 ml-4" src={arrowImage} />
        </a>
        <div>
          <Link
            href={{
              pathname: `/portfolio/[item]`,
              query: { lang: props.language },
            }}
            as={`/${props.querySlug}/${post.slug}?lang=${props.language}#2`}
          >
            <a>
              <div className="w-full image-wrapper">
                <img
                  src={getData(post._embedded, "image")}
                  alt={post.title.rendered}
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
