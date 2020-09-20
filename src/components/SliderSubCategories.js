import React from 'react';
import Link from "next/link";
import arrowImage from "../public/images/arrow.png";
import Slider from "react-slick";
const settings = {
    className: "center",
    infinite: false,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    responsive: [
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};
const SliderSubCategories = (props) => {
    return (
        <Slider {...settings} className="h-full">
            {props.data.map((category, index) => {
                    const cat = category.acf
                    const image = cat.thumbnail_image
                    return (
                        <div key={index}>
                            <div className={"flex flex-col"}>
                                <div className={"text-lg text-black font-medium"} style={{fontWeight: "bold", fontSize: 24, lineHeight: 2, opacity: 0.5}}>
                                    {category.name}
                                </div>
                                <p className={"capabilitiesPageBody truncate-2-lines text-base mt-4"} style={{fontSize: 17}}>
                                    {category.description}
                                </p>
                                <Link href={{pathname: `/[portfolio]/[item]`, query: {lang: props.language}}}
                                      as={`${props.querySlug}/${category.slug}?lang=${props.language}`}>
                                    <a
                                        className="my-4 text-sm w-auto bg-transparent text-black  lowercase hover:text-opacity-100 hover:text-menuTextColor flex flex-row sm:my-4" style={{fontWeight: "bold", opacity: 0.7}}>
                                        read more
                                        <img className="object-contain ml-4" src={arrowImage}/>
                                    </a>
                                </Link>
                                <div className="w-full">
                                    <img src={image.url} className="object-cover w-full h-86 xl:h-80"
                                         alt={image.alt}/>
                                </div>
                            </div>
                        </div>
                    )
                }
            )
            }
        </Slider>
    );
};

export default SliderSubCategories;