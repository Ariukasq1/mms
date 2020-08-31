import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/layouts/Layout";
import {configureLanguage} from "../../utils/language";
import axios from "axios";
import {Config} from "../../config";
import Slider from "react-slick";
import mainStore from "../../stores";
import ReactFullpage from "../../lib/fullpage";
import Error from 'next/error';
import ItemDetailsWithGallery from "../../components/ItemDetailsWithGallery";


const Item = ({subcategory, slugQuery, itemQuery}) => {
    if (!subcategory) return <Error statusCode={404}/>
    const router = useRouter();
    let item_acf;
    let products;
    if (slugQuery === 'brands') {
        console.log(slugQuery)
        item_acf = subcategory
        products = subcategory.products
    } else {
        item_acf = subcategory[0].acf
    }
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    useEffect(() => {

        setNav1(slider1);
        setNav2(slider2);

    });

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

    const settingsProductItems = {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
    }
    let renderBrandItems;
    let renderImages;
    let renderThumbnail;
    if (slugQuery !== 'brands') {
        renderImages = item_acf.slider_images.map((data, index) => (
            <div key={index} className={"slick-slide"}>
                <img className={"object-cover object-center h-full w-full"} src={data.image.url} alt={data.image.alt}/>
            </div>
        ))
        renderThumbnail = item_acf.slider_images.map((data, index) => (
            <div key={index} className={"slick-slide"}>
                <img className={"object-cover slick-slide-image h-40 w-full"} src={data.image.url}
                     alt={data.image.alt}/>
            </div>
        ))
    } else {
        renderBrandItems = products.map((product, index) => (
                <div key={index} className={"h-64"}>
                    <div className={"font-medium text-black text-xl mb-4"}>{product.product_name}</div>
                    <div>
                        <img src={product.product_image.url}/>
                    </div>
                </div>
            )
        )
    }


    return (
        <Layout>
            <ReactFullpage
                // navigationPosition={"left"}
                // navigation
                paddingTop={"116px"}
                scrollOverflow={true}
                onLeave={(origin, destination, direction) => {
                    // console.log("onLeave event", {origin, destination, direction});
                }}
                render={({state, fullpageApi}) => {
                    // console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

                    return (
                        <div id="fullpage">
                            {/*<div className={"section"}>*/}
                            {/*    <ItemDetailsWithGallery subcategory={subcategory}/>*/}
                            {/*</div>*/}
                            <div className="section">
                                <div className={"itemDetails flex flex-row items-center justify-between md:flex-col sm:flex-col"}>
                                    <div className={"itemDetailsTexts w-1/2 pl-48 pr-24 md:w-full md:pl-10 md:pb-10 xl:pl-24 sm:px-12 sm:w-full"}>
                                        {slugQuery !== 'brands' ?
                                            <div>
                                                <h2 className={"py-4 font-medium"}>#{subcategory[0].name}</h2>
                                                <div className={"text-xl"}
                                                     dangerouslySetInnerHTML={{__html: item_acf.editor}}/>
                                            </div> :
                                            <div style={{paddingTop: "116px"}}>
                                                <div className={"mb-8"}>
                                                    <img src={item_acf.brand_image.url}/>
                                                </div>
                                                <div className={"text-lg pb-10"}
                                                     dangerouslySetInnerHTML={{__html: products.map(product => product.product_about)}}/>
                                            </div>

                                        }
                                    </div>
                                    <div className={"itemDetailsImages w-1/2 relative md:w-full sm:w-full"}>
                                        {slugQuery !== 'brands' ?
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
                                            </div> :
                                            <div>
                                                <img src={item_acf.brand_thumbnail.url}
                                                     className={"object-contain object-center h-body w-full"}/>
                                            </div>}

                                    </div>
                                </div>
                            </div>
                            {slugQuery === 'brands' ? <div className="section">
                                <div className={"brandsProducts px-40 flex flex-col"}>
                                    <div className={"self-end mb-10"}>
                                        <img src={subcategory.brand_image.url}/>
                                    </div>
                                    <Slider {...settingsProductItems}>
                                        {renderBrandItems}
                                    </Slider>
                                </div>
                            </div> : null}

                        </div>
                    );
                }}
        />

</Layout>
)
    ;
};

Item.getInitialProps = async (ctx) => {
    const language = configureLanguage(ctx);
    const query = ctx.query.lang;
    const slugQuery = ctx.query.categories;
    const itemQuery = ctx.query.item;
    const fetcher = url => axios.get(url).then(res => res.data)
    let subcategory;
    if (slugQuery !== 'brands') {
        subcategory = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=${itemQuery}&${query === 'mn' ? '?lang=' + query : ''}`)
    } else {
        const brands = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=${slugQuery}&${query === 'mn' ? '?lang=' + query : ''}`)
        brands[0].acf.brands.forEach(el => {
            if (el.slug === itemQuery) {
                subcategory = el
                return
            } else {
                if (ctx.res) {
                    ctx.res.statusCode = 404
                }
            }

        });
    }
    return {subcategory, slugQuery, itemQuery}
}


export default Item;