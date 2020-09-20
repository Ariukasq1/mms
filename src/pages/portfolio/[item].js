import React from 'react';
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import ItemDetailsWithGallery from "../../components/ItemDetailsWithGallery";
import {Config} from "../../config";
import {configureLanguage} from "../../utils/language";
import axios from "axios";
import Slider from "react-slick";
import styled from 'styled-components'
import arrowImage from "../../public/images/arrow.png";

const settings = {
    infinite: true,
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
                rows: 2,
                infinite: true,
                slidesPerRow: 1,
                dots: true,
            }
        },
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
                rows: 2,
                infinite: true,
                slidesPerRow: 1,
                dots: true,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                rows: 2,
                infinite: true,
                slidesPerRow: 1,
                dots: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                rows: 2,
                infinite: true,
                slidesPerRow: 1,
                dots: true,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                rows: 1,
                infinite: true,
                slidesPerRow: 1,
                dots: true,
            }
        }
    ]
};

const Gallery = styled.div`
  /* Adapt the colours based on primary prop */
  position: relative;
   &:hover:before {
      filter: brightness(0.4) ;
   }
  &:before {
      content: "";
      position: absolute;
     
      z-index: -99;
      width: 100%;
      height: 100%;
      
      display: block;
      background-image: url(${props => props.item.image.url});
      background-repeat: no-repeat;
      background-size: cover;
      filter: brightness(0.6) ;
      transition: 0.8s;
     
  }
`;

const Portfolio = styled.div`
  /* Adapt the colours based on primary prop */
  
  &:before {
      content: "";
      position: fixed;
      left: 0;
      right: 0;
      z-index: -1;
      
      display: block;
      background: url(${props => props.item.background_image.url});
      box-shadow: inset 2000px 0 0 0 rgba(255, 255, 255, 0.7);
     
      
      width: 100vw;
      height: 100vh;
  }
  &:after {
      background: rgba(255,255,255);
  }
`;

const Item = ({subcategory}) => {
    const portfolio = subcategory[0].acf.portfolio
    const renderGallery = (portfolio) => {
        return (
            portfolio.map((item, index) => (
                    <div key={index}>
                        <Gallery item={item} style={{height: "300px", width: '100%'}}
                                 className={"portfolioGallery flex flex-col justify-center items-center text-center pb-12"}>
                            <div className={"text-white p-10"}>
                                {item.name}
                            </div>
                            <a className={"portfolioGalleryButton text-white text-sm opacity-0 transition duration-500 ease-in-out flex flex-row hover:text-gray-300"}>
                                {item.button}
                                <img className="object-contain ml-4" src={arrowImage}/>
                            </a>
                        </Gallery>
                    </div>
                )
            )
        )
    }

    return (
        <Layout>
            <ReactFullpage
                navigationPosition={"left"}
                navigation
                paddingTop={"116px"}
                scrollOverflow={false}
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
                                <Portfolio item={portfolio} className={"h-full flex flex-col justify-center  px-80 md:px-20 xl:px-24 lg:px-24 xl:px-36 2xl:px-40 sm:pl-12 sm:pr-10"}>
                                    <h2 className={"text-menuTextColor my-6"}>{subcategory[0].name}</h2>
                                    <Slider {...settings}>
                                        {renderGallery(portfolio.portfolios)}
                                    </Slider>
                                </Portfolio>
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