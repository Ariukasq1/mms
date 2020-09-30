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
          <div className="text mr-10 sm:ml-8 sm:mr-0 md:m-0">
            <div
              className="title text-left  leading-snug 2xl:w-full text-7xl sm:text-4xl sm:w-full  sm:mb-0 sm:mx-0 md:mx-0 md:w-full md:leading-none lg:w-full xl:w-full mb-20"
              dangerouslySetInnerHTML={{ __html: sliderTitle.title_text }}
              style={{
                color: sliderTitle.title_color,
              }}
            />
            <div
              className="desc mx-10 text-xl sm:mx-0 md:mx-0"
              dangerouslySetInnerHTML={{ __html: sliderBody.body_text }}
              style={{
                color: sliderBody.body_font_color,
              }}
            />
          </div>
          <div className="image w-4/7 sm:ml-8">
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
