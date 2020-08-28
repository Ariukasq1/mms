import React from 'react';
import Layout from "../components/layouts/Layout";
import Footer from "../components/layouts/footer";
import ScrollableBox, {useDefaultLipClassNames} from "react-scrollable-box";
import ReactFullpage from "../lib/fullpage";
import axios from "axios";
import {Config} from "../config";
import {configureLanguage} from "../utils/language";

const About = ({about, contact}) => {
    const {details, what_we_do, background_image} = about[0].acf.about
    const lipClassNames = useDefaultLipClassNames();

    const renderCards = (item) => (
        <div className={" w-1/2 p-3 px-16"}>
            <div className={"flex flex-row bg-white  items-center p-5"}>
                <img src={item.image.url}/>
                <p className={"ml-10 font-bold"}>{item.title}</p>
            </div>

        </div>
    )


    return (
        <Layout>
            <ReactFullpage
                navigationPosition={"left"}
                navigation
                paddingTop={"116px"}
                onLeave={(origin, destination, direction) => {
                    // console.log("onLeave event", {origin, destination, direction});
                }}
                render={({state, fullpageApi}) => {
                    // console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console
                    return (
                        <div id="fullpage">
                            <div className={"section"} style={{background: "whitesmoke"}}>

                                <div className={"px-40 flex flex-row justify-center items-center"}>
                                    <div className={"w-1/2"}>
                                        <img className={"h-auto object-cover"} src={details.image.url}/>
                                    </div>
                                    <div className={" w-1/2  pl-20 "}>
                                        <ScrollableBox
                                            {...lipClassNames}
                                            style={{maxHeight: '440px', overflow: 'auto'}}
                                        >
                                            <h2 className={"font-medium mb-8"}>{details.title}</h2>
                                            <div className={"careerDetails text-lg pr-20"}
                                                 dangerouslySetInnerHTML={{__html: details.editor}}/>
                                        </ScrollableBox>
                                    </div>

                                </div>
                            </div>
                            <div className={"section px-72"} style={{backgroundImage: `url(${background_image.url})`}}>
                                <div className={"px-16"}>
                                    <h2 className={"text-white mb-8 "}>{what_we_do.name}</h2>
                                </div>
                                <div className={"flex flex-wrap "}>

                                    {what_we_do.items.map(item => renderCards(item))}
                                </div>

                            </div>
                            <div className={"section"}>
                                <div className={"flex justify-center items-center"}>
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
                                </div>

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