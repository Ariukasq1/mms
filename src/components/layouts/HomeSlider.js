import React from "react";
import Slider from "react-slick";

const settings = {
  className: "center",
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
};
const HomeSlider = ({ sliders }) => {
  const renderSlider = sliders.map((slider, index) => {
    const sliderObj = slider.acf;
    const sliderTitle = sliderObj.slider_title;
    const sliderBody = sliderObj.slider_body;
    const sliderImage = sliderObj.slider_image;
    return (
      <div key={index}>
        <div
          style={{ background: sliderObj.slider_background_color }}
          className={`wrapper h-body sm:px-10 sm:flex-col px-56 md:px-24 lg:px-20 justify-between sm:justify-evenly  ${
            sliderObj.position_of_image === "right"
              ? "flex-row"
              : "flex-row-reverse"
          }`}
        >
          <div className="homeSliderText mr-10 sm:ml-8 sm:mr-0 md:m-0">
            <h3
              className="text-left w-3/5 leading-snug 3xl:w-3/5 2xl:w-full mb-8 mx-10 text-7xl  sm:text-4xl sm:w-full  sm:mb-0 sm:mx-0 md:mx-0 md:w-full md:leading-none lg:w-full xl:w-full"
              style={{
                color: sliderTitle.title_color,
                fontWeight: "600",
              }}
            >
              {sliderTitle.title_text}
            </h3>
            <p
              className={"mx-10 text-xl sm:mx-0 md:mx-0"}
              style={{
                color: sliderBody.body_font_color,
                fontWeight: "50",
                opacity: 0.9,
              }}
            >
              {sliderBody.body_text}
            </p>
          </div>
          <div className="homeSliderImage w-4/7 sm:ml-8">
            <img src={sliderImage.url} alt={sliderImage.alt} />
          </div>
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
