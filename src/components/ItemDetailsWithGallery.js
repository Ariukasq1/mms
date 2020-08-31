import React, {useEffect, useState} from 'react';
import Slider from "react-slick";

const ItemDetailsWithGallery = ({subcategory}) => {
    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    };

    const settingsThumbs = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        // dots: true,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: true
    };

    const item_acf = subcategory[0].acf
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    useEffect(() => {

        setNav1(slider1);
        setNav2(slider2);

    });
    const renderImages = item_acf.slider_images.map((data, index) => (
        <div key={index} className={"slick-slide"}>
            <img className={"object-cover object-center h-body w-full"} src={data.image.url} alt={data.image.alt}/>
        </div>
    ))
    const renderThumbnail = item_acf.slider_images.map((data, index) => (
        <div key={index} className={"slick-slide"}>
            <img className={"object-cover slick-slide-image h-40 w-full"} src={data.image.url}
                 alt={data.image.alt}/>
        </div>
    ))

    return (
        <div className={"itemDetails flex flex-row items-center justify-between md:flex-col sm:flex-col"}>
            <div className={"itemDetailsTexts w-1/2 pl-80 pr-24 md:w-full md:pl-24 md:pb-10 lg:pl-24 lg:pr-12 xl:px-24 2xl:pl-40 sm:pl-12 sm:pr-10 sm:w-full"}>
                <div>
                    <h2 className={"py-4 font-medium"}>#{subcategory[0].name}</h2>
                    <div className={"text-xl"}
                         dangerouslySetInnerHTML={{__html: item_acf.editor}}/>
                </div>
            </div>
            <div className={"itemDetailsImages w-1/2 relative md:w-full sm:w-full"}>
                <div className={"relative"}>
                    <Slider
                        {...settingsMain}
                        asNavFor={nav2}
                        ref={slider => (setSlider1((slider)))}
                    >
                        {renderImages}
                    </Slider>
                    <div className={"thumbnailSlide absolute w-full bottom-0"}>
                        <Slider
                            {...settingsThumbs}
                            asNavFor={nav1}
                            ref={slider => (setSlider2(slider))}
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