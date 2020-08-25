import React from 'react';
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import ItemDetailsWithGallery from "../../components/ItemDetailsWithGallery";
import {Config} from "../../config";
import {configureLanguage} from "../../utils/language";
import axios from "axios";
import Slider from "react-slick";

import styled from 'styled-components'

const settings = {
    className: "center",
    infinite: false,
    slidesToShow: 3,
    speed: 500,
    rows: 2,
    slidesPerRow: 2
};

const Item = ({subcategory}) => {
    const {image} = subcategory[0].acf.slider_images[0]
    return (
        <Layout>
            <ReactFullpage
                navigationPosition={"left"}
                navigation
                onLeave={(origin, destination, direction) => {
                    // console.log("onLeave event", {origin, destination, direction});
                }}
                render={({state, fullpageApi}) => {
                    // console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

                    return (
                        <div id="fullpage">
                            <div className={"section"}>
                                <ItemDetailsWithGallery subcategory={subcategory}/>
                            </div>
                            <div className={"section"}>
                                <Slider {...settings}>
                                    <div style={{backgroundImage: `url(${image.url})`}}>
                                        <div>
                                            name
                                        </div>
                                        <div>
                                            Read more
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    )
                }}
        />

</Layout>
)
    ;
};

Item.getInitialProps = async (ctx) => {
    const language = configureLanguage(ctx);
    const query = ctx.query.lang;
    const itemQuery = ctx.query.item;
    const fetcher = url => axios.get(url).then(res => res.data)
    const subcategory = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=${itemQuery}&${query === 'mn' ? '?lang=' + query : ''}`)
    return {subcategory}
}

export default Item;