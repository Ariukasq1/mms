import { AutoComplete } from "antd";
import Ribbon from "antd/lib/badge/Ribbon";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const ItemDetailsWithGallery = ({ images }) => {
  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const renderImages = images.map((image, index) => {
    if (!image || !image.includes("/uploads/")) {
      return null;
    }

    return (
      <div key={index} className={"slick-slide sliderBigImg"}>
        <img
          className={"object-cover object-center h-body w-full"}
          src={image}
          alt={index}
        />
      </div>
    );
  });

  const renderThumbnail = images.map((image, index) => {
    if (!image || !image.includes("/uploads/")) {
      return null;
    }

    return (
      <div key={index} className={"slick-slide"}>
        <img
          className={"object-cover slick-slide-image h-40 w-full"}
          src={image}
          alt={index}
        />
      </div>
    );
  });

  return (
    <div>
      <div className={"itemDetailsImages relative w-full"}>
        <div className={"relative"}>
          <Slider
            {...settingsMain}
            asNavFor={nav2}
            ref={(slider) => setSlider1(slider)}
          >
            {renderImages}
          </Slider>
          <div className={"thumbnailSlide absolute w-full bottom-0"}>
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={(slider) => setSlider2(slider)}
              slidesToShow={3}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {renderThumbnail}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsWithGallery;
