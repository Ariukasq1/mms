import React from 'react';
import Layout from "../../components/layouts/Layout";
import SliderSubCategories from "../../components/SliderSubCategories";
import {configureLanguage} from "../../utils/language";
import {Config} from "../../config";
import axios from "axios";
import ReactFullpage from "../../lib/fullpage";
import styled from 'styled-components'

const Portfolio = styled.div`
  /* Adapt the colours based on primary prop */
  &:before {
      content: "";
      position: fixed;
      left: 0;
      right: 0;
      z-index: -1;
      
      display: block;
      background-image: url(${props => props.background_image.url});
      width: 100vw;
      height: 100vh;
      filter: brightness(0.3) ;
  
  }
`;
const Index = ({categories, language, category}) => {
    const {interiors, exteriors, background_image} = category[0].acf.portfolio
    const renderInteriorExterior = (item) => {
        return (
            <div
                className={"flex flex-row  rounded-none overflow-hidden my-4 border border-solid border-menuTextColor bg-white "}>
                <div className={"flex justify-center items-center"}>
                    <img className={"w-20 h-20 rounded-full m-6"} src={item.image.url}/>
                </div>
                <div className={"interiorTexts flex flex-col justify-center"}>
                    <div className={"font-medium text-black"}>
                        {item.name}
                    </div>
                    <div className={"mr-6 leading-6 sm:mr-2"}>
                        {item.description}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Layout>
            <ReactFullpage
                navigationPosition={"left"}
                navigation
                scrollOverflow={true}
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
                                    <div className="capabilitiesPageSlider px-72 xl:px-20 2xl:px-40 md:px-20 lg:px-20 sm:px-10" style={{flexBasis: '50%'}}>
                                        <SliderSubCategories data={categories} querySlug={'portfolio'}
                                                             language={language}/>
                                    </div>
                                </div>
                            </div>
                            <div className="section portfolio">
                                <Portfolio background_image={background_image}>
                                    <div className={"px-72 flex flex-row justify-center xl:px-20 2xl:px-40 md:px-20 md:flex-col lg:px-20 sm:flex-col sm:px-10"}
                                         style={{paddingTop: "116px"}}>
                                        <div className={"flex flex-col justify-center mr-12 md:mr-2 md:ml-2 sm:mr-0"}>
                                            <h2 className={"uppercase text-white"}>interiors</h2>
                                            {interiors.map(interior => {
                                                return renderInteriorExterior(interior)
                                            })}
                                        </div>
                                        <div className={"flex flex-col ml-12 md:ml-2 sm:ml-0"}>
                                            <h2 className={"uppercase text-white"}>exteriors</h2>
                                            {exteriors.map(exterior => {
                                                return renderInteriorExterior(exterior)
                                            })}
                                        </div>
                                    </div>
                                </Portfolio>
                            </div>
                        </div>
                    )
                        ;
                }}
        />
</Layout>
)
    ;
};

Index.getInitialProps = async (ctx) => {
    const query = ctx.query.lang;
    const language = configureLanguage(ctx);
    const fetcher = url => axios.get(url).then(res => res.data)
    const category = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=portfolio&${query === 'mn' ? '?lang=' + query : ''}`)
    const categories = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?parent=${category.map((data) => data.id)}&${query === 'mn' ? '?lang=' + query : ''}`)
    return {language, categories, category}
}

export default Index;
