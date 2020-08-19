import React from 'react';
import Slider from "react-slick";
import arrow from '../public/images/arrow.png'
import arrowImage from "../public/images/arrow.png";
import mainStore from "../stores";
import Link from "next/link";


const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>
};

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <img
            src={arrow}
            className={className}
            style={{...style, display: "block"}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <img
            src={arrow}
            className={className}
            style={{...style, display: "block", transform: 'rotate(180deg)'}}
            onClick={onClick}
        />
    );
}

const BrandsComponent = ({data}) => {
    const {language} = mainStore()

    const renderBrands = data.map((brand, index) => {
        const item = brand.acf
        return (
            <div key={index}>
                <div className="w-auto h-12">
                    <img src={item.brand_image.url} className="object-contain h-full" alt={item.brand_image.alt}/>
                </div>
                <Link href={{pathname: `${brand.taxonomy}/${brand.slug}`, query: {lang: language}}}>
                    <a
                        className="my-8 text-lg w-auto bg-transparent text-black text-opacity-50 lowercase hover:text-opacity-100 hover:text-black flex flex-row">
                        read more
                        <img className="object-contain ml-4" src={arrowImage}/>
                    </a>
                </Link>
                <div className="w-auto h-64">
                    <img src={item.brand_thumbnail.url} className="object-cover h-full" alt={item.brand_thumbnail.alt}/>
                </div>
            </div>
        )
    })
    return (
        <div className="ml-32 justify-start items-start brands">
            <div className="ml-4 mb-20 font-bold text-4xl text-black">
                Brands
            </div>
            <Slider {...settings} className="h-full">
                {renderBrands}
            </Slider>
        </div>

    );
};

export default BrandsComponent;