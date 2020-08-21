import React from 'react';
import Layout from "../../components/layouts/Layout";
import BrandsComponent from "../../components/BrandsComponent";
import {Config} from "../../config";
import axios from "axios";
import {configureLanguage} from "../../utils/language";
import Slider from "react-slick";
import Link from "next/link";
import arrowImage from "../../public/images/arrow.png";
import mainStore from "../../stores";
import ReactFullpage from "../../lib/fullpage";

const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
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
const anchors = ["1", "2", "section3"]
const Categories = ({brands, categories, querySlug}) => {
    const {language} = mainStore()
    const renderCategories = categories.map((category, index) => {
            const cat = category.acf
            const image = cat.thumbnail_image
            return (
                <div key={index}>
                    <div className={"flex flex-col"}>
                        <div className={"text-lg text-black font-medium"}>
                            {category.name}
                        </div>
                        <p className={"capabilitiesPageBody truncate-2-lines text-base mt-4"}>
                            {category.description}
                        </p>
                        <Link href={{pathname: `${querySlug}/${category.slug}`, query: {lang: language}}}>
                            <a
                                className="my-4 text-sm w-auto bg-transparent text-black  lowercase hover:text-opacity-100 hover:text-menuTextColor flex flex-row sm:my-4">
                                read more
                                <img className="object-contain ml-4" src={arrowImage}/>
                            </a>
                        </Link>
                        <div className="w-full">
                            <img src={image.url} className="object-cover w-full h-86"
                                 alt={image.alt}/>
                        </div>
                    </div>
                </div>
            )
        }
    )

    return (
        <Layout>
            <div className="relative">
                <ReactFullpage
                    anchors={anchors}
                    navigationPosition={"left"}
                    navigation
                    navigationTooltips={anchors}
                    onLeave={(origin, destination, direction) => {
                        // console.log("onLeave event", {origin, destination, direction});
                    }}
                    render={({state, fullpageApi}) => {
                        // console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

                        return (
                            <div id="fullpage">
                                <div className="section">
                                    <div className="capabilitiesPage">
                                        <div className="capabilitiesPageContent">

                                        </div>
                                        <div className="capabilitiesPageSlider px-72" style={{flexBasis: '50%'}}>
                                            <Slider {...settings} className="h-full">
                                                {renderCategories}
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                                <div className="section">
                                    <BrandsComponent data={brands}/>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>


        </Layout>
    );
};

Categories.getInitialProps = async (ctx) => {
    const language = configureLanguage(ctx);
    const query = ctx.query.lang;
    const querySlug = ctx.query.categories
    const fetcher = url => axios.get(url).then(res => res.data)
    const brands = await fetcher(`${Config.apiUrl}/wp/v2/brands${query === 'mn' ? '?lang=' + query : ''}`)
    const category = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=${ctx.query.categories}&${query === 'mn' ? '?lang=' + query : ''}`)
    const categories = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?parent=${category.map((data) => data.id)}&${query === 'mn' ? '?lang=' + query : ''}`)
    return {brands, categories, querySlug}
}

export default Categories;
