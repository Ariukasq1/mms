import React from 'react';
import Layout from "../components/layouts/Layout";
import Footer from "../components/layouts/footer";
import ReactFullpage from "../lib/fullpage";
import axios from "axios";
import {Config} from "../config";
import {configureLanguage} from "../utils/language";
import Time from './time'

const About = ({about, contact}) => {
    const {details, what_we_do, background_image} = about[0].acf.about

    const renderCards = (item) => (
        <div className={" w-1/2 p-3 px-16 sm:w-full sm:px-2"}>
            <div className={"flex flex-row bg-white  items-center p-5"}>
                <img className={"sm:w-16 sm:h-16"} src={item.image.url}/>
                <p className={"ml-10 sm:ml-4 font-bold"}>{item.title}</p>
            </div>

        </div>
    )


    return (
        <Layout>
            <ReactFullpage
                navigationPosition={"left"}
                navigation
                scrollOverflow={true}
                paddingTop={"116px"}
                onLeave={(origin, destination, direction) => {
                }}
                render={({state, fullpageApi}) => {
                    return (
                        <div id="fullpage">
                            <div className={"section"} style={{background: "whitesmoke"}}>

                                <div className={"px-40 flex flex-row justify-center items-stretch sm:flex-col sm:px-16"}>
                                    <div className={"w-1/2 sm:w-full py-24 sm:py-2"}>
                                        <img className={"h-auto object-cover"} src={details.image.url}/>
                                    </div>
                                    <div className={" w-1/2  pl-20 py-24 sm:py-2 sm:w-full sm:pl-0"}>
                                        <h2 className={"font-medium mb-8"}>{details.title}</h2>
                                        <div className={"careerDetails text-lg pr-20 sm:pr-0"}
                                             dangerouslySetInnerHTML={{__html: details.editor}}/>
                                    </div>
                                </div>
                            </div>
                            <div className={"section "}
                                 style={{backgroundImage: `url(${background_image.url})`}}>
                                <div className={"px-16 px-72 xl:px-24 2xl:px-40 sm:px-12"}>
                                    <h2 className={"text-white mb-8 "}>{what_we_do.name}</h2>
                                </div>
                                <div className={"flex flex-wrap sm:flex-col px-72 xl:px-24 2xl:px-40 sm:px-12"}>
                                    {what_we_do.items.map(item => renderCards(item))}
                                </div>

                            </div>
                            <div className={"section"}>
                                {/* <div className={"flex justify-center items-center"}>
                                    <ul className="timeline">
                                        <li>
                                            <div>
                                                <p>description event #1</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <p>description event #2</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <p>description event #4</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <p>description event #5</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <p>description event #6</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}
                                
                              {/* <Timeline/> */}
                              <Time/>
                              
                            </div>
                            <div>
                                
                            </div>
                            <div className={"section "}>
                                <Footer data={contact}/>
                            </div>
                        </div>
                    )
                }}
        />

</Layout>
)
    ;
};

About.getInitialProps = async (ctx) => {
    const language = configureLanguage(ctx);

    const query = ctx.query.lang;
    const fetcher = url => axios.get(url).then(res => res.data)
    const about = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=about&${query === 'mn' ? '?lang=' + query : ''}`)
    const contact = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=contact&${query === 'mn' ? '?lang=' + query : ''}`)
    return {about, contact}
}

export default About;