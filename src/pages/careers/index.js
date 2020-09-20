import React from 'react';
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import axios from "axios";
import {Config} from "../../config";
import ScrollableBox, {useDefaultLipClassNames} from 'react-scrollable-box';
import {configureLanguage} from "../../utils/language";

const Index = ({careers}) => {
    const lipClassNames = useDefaultLipClassNames();

    const {human_resource, career_details, job} = careers[0].acf.careers
    const renderCareerCard = (item) => (
        <div className={" flex flex-col justify-center align-center w-1/4 p-5 group bg-white hover:bg-menuTextColor"} style={{width: 400}}>
            <div style={{width:100, marginBottom: 60} }>
                <img src={item.image.url}/>
            </div>
            <p className={"font-medium text-black text-lg mb-4 group-hover:text-white "} style={{fontSize: 25, fontWeight: "bold", letterSpacing: 0.1}}>
                {item.title}
            </p>

            <p className={"text-black text-sm leading-5 group-hover:text-white"} style={{width: 330, fontSize: 16}}>
                {item.description}
            </p>

        </div>
    )

    const renderJob = (item, index) => (
        <div key={index} className={"flex flex-row items-start mb-8"}>
            <img className={"h-20 w-20 mr-8"} src={item.image.url}/>
            <a target="_blank" href={item.url}>
                <p className={"text-black text-lg"}>{item.description}</p>
            </a>
        </div>
    )

    return (
        <Layout>
            <ReactFullpage
                navigationPosition={"left"}
                navigation
                paddingTop={"116px"}
                onLeave={(origin, destination, direction) => {
                }}
                render={({state, fullpageApi}) => {
                    return (
                        <div id="fullpage">
                            <div className={"section"}>
                            <h4 style={{fontWeight: "bold", marginLeft: 340, fontSize: 30}}>Human Resource</h4>
                                <div className={"px-80 flex flex-wrap mb-4"} style={{margin: "0 auto"}}>
                                    {human_resource.map(data => renderCareerCard(data))}
                                </div>
                            </div>
                            <div className={"section"} style={{background: "whitesmoke"}}>
                                <div className={"px-40 flex flex-row justify-center items-center"}>
                                    <div className={"w-1/2"}>
                                        <img className={"h-auto object-cover"} src={career_details.image.url}/>
                                    </div>
                                    <div className={" w-1/2  pl-20 "}>
                                        <h2 className={"mb-10 font-medium text-sm"}>#{careers[0].name}</h2>
                                        <ScrollableBox
                                            {...lipClassNames}
                                            style={{maxHeight: '440px', overflow: 'auto'}}
                                        >
                                            <div className={"careerDetails text-xl pr-20"}
                                                 dangerouslySetInnerHTML={{__html: career_details.editor}}/>
                                        </ScrollableBox>
                                    </div>
                                </div>
                            </div>
                            <div className={"section"}>
                                <div className={"px-72 flex flex-row"}>
                                    <div className={"w-1/2 pr-20"}>
                                        <div style={{width: 800, marginLeft: "50px", fontSize: 30}}
                                             dangerouslySetInnerHTML={{__html: job.editor}}/>
                                    </div>
                                    <div className={"w-1/2 pl-20 "}>
                                        <h2 className={"mb-8 font-bold"}>{job.description}</h2>
                                        {job.job_application.map(app => renderJob(app))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            />
        </Layout>
    )
        ;
};

Index.getInitialProps = async (ctx) => {
    const language = configureLanguage(ctx);

    const query = ctx.query.lang;
    const fetcher = url => axios.get(url).then(res => res.data)
    const careers = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=careers&${query === 'mn' ? '?lang=' + query : ''}`)
    return {careers}
}

export default Index;