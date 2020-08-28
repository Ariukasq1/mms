import React from 'react';
import Layout from "../../components/layouts/Layout";
import ScrollableBox, {useDefaultLipClassNames} from "react-scrollable-box";
import axios from "axios";
import {Config} from "../../config";
import ReactFullpage from "../../lib/fullpage";
import {configureLanguage} from "../../utils/language";

const News = ({item}) => {
    const lipClassNames = useDefaultLipClassNames();
    const {title, editor, image} = item[0].acf
    return (
        <Layout>
            <ReactFullpage
                navigationPosition={"left"}
                paddingTop={"116px"}
                scrollOverflow={true}
                onLeave={(origin, destination, direction) => {
                    // console.log("onLeave event", {origin, destination, direction});
                }}
                render={({state, fullpageApi}) => {
                    // console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

                    return (
                        <div id="fullpage homeScreen">
                            <div className="section">
                                <div className={"px-40 flex flex-row justify-center items-center"}>
                                    <div className={"w-1/2"}>
                                        <img className={"h-auto object-cover"} src={image.url}/>
                                    </div>
                                    <div className={" w-1/2  pl-20 "}>
                                        <h2 className={"mb-10 font-medium text-sm"}>#News</h2>
                                        <h2 className={"mb-4 font-bold text-sm"}>{title}</h2>
                                        <ScrollableBox
                                            {...lipClassNames}
                                            style={{maxHeight: '400px', overflow: 'auto'}}
                                        >
                                            <div className={"careerDetails text-xl pr-20"}
                                                 dangerouslySetInnerHTML={{__html: editor}}/>
                                        </ScrollableBox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
        />

</Layout>
)
    ;
};

News.getInitialProps = async (ctx) => {
    const language = configureLanguage(ctx);

    const query = ctx.query.lang
    const newsQuery = ctx.query.news
    console.log(ctx.query)
    const fetcher = url => axios.get(url).then(res => res.data)
    const item = await fetcher(`${Config.apiUrl}/wp/v2/posts?slug=${newsQuery}&${query === 'mn' ? '?lang=' + query : ''}`)
    return {item}
}

export default News;