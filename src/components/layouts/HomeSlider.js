import React from "react";
import Slider from "react-slick";

const settings = {
  className: "center",
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
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
          className={`slider-heigth h-body sm:px-10 sm:flex-col px-56 md:px-24 lg:px-20 flex  justify-between items-center sm:justify-evenly  ${
            position_of_image === "right"
              ? "flex-row"
              : position_of_image === "left" && "flex-row-reverse"
          }`}
        >
          <div
            className={`w-10/12 text mr-10 sm:ml-8 sm:mr-0 sm:w-11/12 md:m-0`}
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
              className="text-left leading-snug text-6xl 2xl:w-full lg:text-5xl sm:text-4xl md:text-5xl sm:w-full  xl:text-6xl sm:mb-0 sm:mx-0 md:mx-0 md:w-full md:leading-none lg:w-full xl:w-full mb-20 title"
              dangerouslySetInnerHTML={{ __html: text }}
              style={{
                color: font_color,
                textAlign: position_of_text || "left",
              }}
            />
            <div
              className=" mx-10 text-xl w-full sm:mx-0 md:mx-0 desc"
              dangerouslySetInnerHTML={{ __html: description }}
              style={{
                color: font_color,
              }}
            />
          </div>
          {position_of_image && position_of_image !== "full width" && (
            <div className="image w-4/7 sm:ml-8">
              <img className="lozad" src={image} alt="cover image" />
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <Slider {...settings} className="h-full homeSlider">
      {renderSlider}
    </Slider>
  );
};

export default HomeSlider;
