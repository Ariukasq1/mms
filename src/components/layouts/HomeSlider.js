import React from "react";
import Slider from "react-slick";

const settings = {
  className: "center",
  infinite: true,
  autoplay: true,
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
      <div key={index}>
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
          className={`slider-heigth h-body px-56 flex justify-between items-center sm:justify-evenly sm:px-10 sm:flex-col md:px-24 lg:px-20 ${
            position_of_image === "right"
              ? "flex-row"
              : position_of_image === "left" && "flex-row-reverse"
          }`}
        >
          <div
            className="text w-1/2"
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
              className="title text-7xl font-semibold leading-snug xl:text-6xl sm:text-xl"
              dangerouslySetInnerHTML={{ __html: text }}
              style={{
                color: font_color,
                textAlign: position_of_text || "left",
              }}
            />
            <div
              className="desc text-2xl opacity-80 xl:text-xl sm:text-tiny"
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
