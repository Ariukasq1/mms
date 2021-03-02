import React from "react";
import Slider from "react-slick";

const settings = {
  className: "center",
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
};

const HomeSlider = ({ sliders }) => {
  if (!sliders || sliders.length === 0) {
    return null;
  }

  const renderSlider = sliders.map((slider, index) => {
    const sliderObj = slider.acf;
    const sliderTitle = sliderObj.body.text;
    const sliderFontColor = sliderObj.body.font_color;
    const sliderDesc = sliderObj.body.description;
    const sliderImage = sliderObj.image;

    return (
      <div key={index}>
        <div
          style={{
            background:
              sliderObj.position_of_image &&
              sliderObj.position_of_image === "full width"
                ? `url(${sliderImage})`
                : sliderObj.background_color,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`wrapper h-body sm:px-10 sm:flex-col px-56 md:px-24 lg:px-20 justify-between sm:justify-evenly  ${
            sliderObj.position_of_image === "right"
              ? "flex-row"
              : "flex-row-reverse"
          }`}
        >
          <div
            className={`text mr-10 sm:ml-8 sm:mr-0 md:m-0`}
            style={{
              width:
                sliderObj.position_of_image &&
                sliderObj.position_of_image === "full width" &&
                "62%",
            }}
          >
            <div
              className="title text-left  leading-snug 2xl:w-full text-7xl sm:text-4xl sm:w-full  sm:mb-0 sm:mx-0 md:mx-0 md:w-full md:leading-none lg:w-full xl:w-full mb-20"
              dangerouslySetInnerHTML={{ __html: sliderTitle }}
              style={{
                color: sliderFontColor,
              }}
            />
            <div
              className="desc mx-10 text-xl sm:mx-0 md:mx-0"
              dangerouslySetInnerHTML={{ __html: sliderDesc }}
              style={{
                color: sliderFontColor,
              }}
            />
          </div>
          {sliderObj.position_of_image &&
            sliderObj.position_of_image !== "full width" && (
              <div className="image w-4/7 sm:ml-8">
                <img src={sliderImage} alt="cover image" />
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
