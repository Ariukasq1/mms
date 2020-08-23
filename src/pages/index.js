import React, {useContext, useEffect, useState} from 'react';
import Layout from "../components/layouts/Layout";
import ReactFullpage from "../lib/fullpage";
import {Config} from "../config";
import axios from 'axios'
import DataContext from "../components/DataContext";
import {configureLanguage} from "../utils/language";
import HomeSlider from "../components/layouts/HomeSlider";
import CapabilitiesComponent from "../components/CapabilitiesComponent";
import IndustryComponent from "../components/IndustryComponent";
import ShowRoomComponent from "../components/ShowRoomComponent";
import BrandsComponent from "../components/BrandsComponent";
import mainStore from "../stores";
import {MenuContext} from "../components/LanguageContext";
import Router from "next/router";

const Index = ({sliders, home_screen_items, brands}) => {
    const daa = useContext(MenuContext)
    // Router.events.on('routeChangeComplete', () => {
    //     daa.setMenu({bottom_menu, top_menu})
    // })
    // useEffect(() => {
    //     daa.setMenu({bottom_menu, top_menu})
    //     setLanguage(query)
    // }, [])
    const anchors = ["section1", "section2", "section3", "section4", "section5"]
    let capabilities
    let industry
    let showroom
    home_screen_items.filter(function (item) {
        switch (item.slug) {
            case 'capabilities':
                capabilities = item
                break
            case 'industries':
                industry = item
                break
            case 'showroom':
                showroom = item
                break
        }
    })
    return (
        // <DataContext.Provider value={{top_menu: top_menu, bottom_menu: bottom_menu, query: query}}>
        <Layout>
            <div className="relative">
                <ReactFullpage
                    anchors={anchors}
                    navigationPosition={"left"}
                    navigation
                    scrollOverflow={true}
                    navigationTooltips={anchors}
                    onLeave={(origin, destination, direction) => {
                        // console.log("onLeave event", {origin, destination, direction});
                    }}
                    render={({state, fullpageApi}) => {
                        // console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

                        return (
                            <div id="fullpage">
                                <div className="section">
                                    <HomeSlider sliders={sliders}/>
                                </div>
                                <div className="section">
                                    <CapabilitiesComponent data={capabilities}/>
                                </div>
                                <div className="section">
                                    <IndustryComponent data={industry}/>
                                </div>
                                <div className="section">
                                    <ShowRoomComponent data={showroom}/>
                                </div>
                                <div className="section">
                                    <div className="ml-32">
                                        <BrandsComponent data={brands}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        </Layout>
        // </DataContext.Provider>
    );
}

Index.getInitialProps = async (ctx) => {
    const query = ctx.query.lang;
    const fetcher = url => axios.get(url).then(res => res.data)
    const sliders = await fetcher(`${Config.apiUrl}/wp/v2/sliders${query === 'mn' ? '?lang=' + query : ''}`)
    const home_screen_items = await fetcher(`${Config.apiUrl}/wp/v2/home_screen_items${query === 'mn' ? '?lang=' + query : ''}`)
    // const brands = await fetcher(`${Config.apiUrl}/wp/v2/brands${query === 'mn' ? '?lang=' + query : ''}`)
    const brands = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=brands&${query === 'mn' ? '?lang=' + query : ''}`)
    return {sliders, query, home_screen_items, brands}
}

export default Index

