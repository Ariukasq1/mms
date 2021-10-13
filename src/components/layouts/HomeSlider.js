import React from "react";
import Slider from "react-slick";

const settings = {
  className: "center",
  infinite: true,
  autoplay: false,
  autplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
};

const HomeSlider = ({ sliders }) => {
  if (!sliders || sliders.length === 0) {
    return null;
  }

  const renderSlider = sliders.map((slider, index) => {
    const {
      body,
      image,
      background_color,
      position_of_image,
      position_of_text,
    } = slider.acf || {};

    const { text, description, font_color } = body || {};

    return (
      <div key={index} className="md:pt-28">
        <div
          style={{
            background:
              position_of_image && position_of_image === "full width"
                ? `url(${image})`
                : background_color,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            justifyContent:
              position_of_image === "full width"
                ? position_of_text === "right"
                  ? "flex-end"
                  : position_of_text || "left"
                : "space-between",
          }}
          className={`px-32 flex justify-between items-center 2xl:px-28 xl:px-16 lg:px-28 md:px-5 sm:px-5 h-body ${
            position_of_image === "right"
              ? "flex-row"
              : position_of_image === "left" && "flex-row-reverse"
          }`}
        >
          <div
            className="text w-1/2 md:w-screen"
            data-aos="fade-down"
            style={{
              width:
                position_of_image &&
                position_of_image === "full width" &&
                "70%",
              textAlign: position_of_text || "left",
            }}
          >
            <div
              className="title text-7xl font-semibold leading-snug 2xl:text-6xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl"
              dangerouslySetInnerHTML={{ __html: text }}
              style={{
                color: font_color,
                textAlign: position_of_text || "left",
              }}
            />
            <div
              className="desc text-2xl opacity-80 xl:text-xl sm:text-tiny md:text-tiny"
              dangerouslySetInnerHTML={{ __html: description }}
              style={{
                color: font_color,
              }}
            />
          </div>
        </div>
      </div>
    );
  });

  return <Slider {...settings}>{renderSlider}</Slider>;
};

export default HomeSlider;
