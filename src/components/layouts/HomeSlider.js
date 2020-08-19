import React from 'react';
import Slider from "react-slick";

const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
};
const HomeSlider = ({sliders}) => {
    const renderSlider = sliders.map((slider, index) => {
        const sliderObj = slider.acf
        const sliderTitle = sliderObj.slider_title
        const sliderBody = sliderObj.slider_body
        const sliderImage = sliderObj.slider_image
        return (
            <div key={index}>
                <div style={{
                    background: sliderObj.slider_background_color,
                    flexDirection: sliderObj.position_of_image === 'right' ? "row" : "row-reverse"
                }} className={"wrapper px-56"}>
                    <div className="homeSliderText">
                        <h3 className="mb-8 mx-10" style={{
                            fontSize: `${sliderTitle.title_size}px`,
                            color: sliderTitle.title_color,
                            fontWeight: '600',
                            textAlign: 'left',
                            lineHeight: '5rem',

                        }}>{sliderTitle.title_text}</h3>
                        <p className={"mx-10"} style={{
                            fontSize: `${sliderBody.body_font_size}px`,
                            color: sliderBody.body_font_color,
                            fontWeight: '50',
                            opacity: 0.7
                        }}>{sliderBody.body_text}</p>
                    </div>
                    <div className="homeSliderImage">
                        <img src={sliderImage.url} alt={sliderImage.alt}/>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <Slider {...settings} className="h-full">
            {renderSlider}
        </Slider>
    );
};

export default HomeSlider;