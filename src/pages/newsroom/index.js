import React, {useState} from 'react';
import Layout from "../../components/layouts/Layout";
import ReactFullpage from "../../lib/fullpage";
import styled from "styled-components";
import axios from "axios";
import {Config} from "../../config";
import {Pagination} from "antd";
import {useRouter} from "next/router";
import mainStore from "../../stores";
import Link from "next/link";
import {configureLanguage} from "../../utils/language";
import ScrollableBox, {useDefaultLipClassNames} from 'react-scrollable-box';

const News = styled.div`
  /* Adapt the colours based on primary prop */
  position: relative;
   &:hover:before {
      filter: brightness(0.6) ;
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
      filter: brightness(0.8) ;
      transition: 0.8s;
     
  }
`;

const Index = ({newsroom, news, page}) => {
    const lipClassNames = useDefaultLipClassNames();
    const [pager, setPager] = useState(page === undefined ? 1 : page)
    const newsroom_details = newsroom[0].acf
    const router = useRouter()
    const {language} = mainStore()
    const handleChange = value => {
        setPager(value)
        router.push({
            pathname: '/newsroom',
            query: {lang: language, page: value},
        })
    }
    const renderNews = (item, index) => (
        <div key={index} className={"flex flex-col w-1/4  p-4 bg-white"}>
            <img className={"w-full h-64 object-cover relative"} src={item.acf.image.url}/>
            <Link href={{pathname: '/newsroom/[news]', query: {news: item.slug}}}
                  as={`/newsroom/${item.slug}?lang=${language}`}>
                <a className={"text-sm my-4 truncate-3-lines leading-4"}>{item.title.rendered}</a>
            </Link>
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
                            <div className={"section px-72 xl:px-40"} style={{margin: "0 auto", width: "90%"}}>
                            <h4 style={{fontWeight: "bold", marginLeft: 25, fontSize: 30}}>News</h4>
                                <div className="grid grid-rows-4 grid-cols-4 px-10">
                                    <News item={newsroom[newsroom.length - 5].acf}
                                          className=" row-span-2 col-span-1 relative">
                                        <div className={"flex flex-col absolute bottom-0 "}>
                                            <Link href={{
                                                pathname: '/newsroom/[news]',
                                                query: {news: newsroom[newsroom.length - 5].slug}
                                            }}
                                                  as={`/newsroom/${newsroom[newsroom.length - 5].slug}?lang=${language}`}>
                                                <a className={"text-base leading-5 p-6 text-white w-full"}>
                                                    {newsroom[newsroom.length - 5].title.rendered}
                                                </a>
                                            </Link>
                                        </div>
                                    </News>
                                    <News item={newsroom[newsroom.length - 4].acf}
                                          className="h-72  row-span-2 col-span-1">
                                        <div className={"flex flex-col absolute bottom-0 "}>
                                            <Link href={{
                                                pathname: '/newsroom/[news]',
                                                query: {news: newsroom[newsroom.length - 4].slug}
                                            }}
                                                  as={`/newsroom/${newsroom[newsroom.length - 4].slug}?lang=${language}`}>
                                                <a className={"text-base leading-5 p-6 text-white w-full"}>
                                                    {newsroomnewsroom.length - 4].title.rendered}
                                                </a>
                                            </Link>
                                        </div>
                                    </News>
                                    <News item={newsroom[newsroom.length - 3].acf}
                                          className=" row-span-4 col-span-2">
                                        <div className={"flex flex-col absolute bottom-0 "}>
                                            <Link href={{
                                                pathname: '/newsroom/[news]',
                                                query: {news: newsroom[newsroom.length - 3].slug}
                                            }}
                                                  as={`/newsroom/${newsroom[newsroom.length - 3].slug}?lang=${language}`}>
                                                <a className={"text-base leading-5 p-6 text-white w-full"}>
                                                    {newsroom[newsroom.length - 3].title.rendered}
                                                </a>
                                            </Link>
                                        </div>
                                    </News>
                                    <News item={newsroom[newsroom.length - 2].acf}
                                          className="h-72  row-span-2 col-span-1">
                                        <div className={"flex flex-col absolute bottom-0 "}>
                                            <Link href={{
                                                pathname: '/newsroom/[news]',
                                                query: {news: newsroom[newsroom.length - 2].slug}
                                            }}
                                                  as={`/newsroom/${newsroom[newsroom.length - 2].slug}?lang=${language}`}>
                                                <a className={"text-base leading-5 p-6 text-white w-full"}>
                                                    {newsroom[newsroom.length - 2].title.rendered}
                                                </a>
                                            </Link>
                                        </div>
                                    </News>
                                    <News item={newsroom[newsroom.length - 1].acf}
                                          className="h-72  row-span-2 col-span-1">
                                        <div className={"flex flex-col absolute bottom-0 "}>
                                            <Link href={{
                                                pathname: '/newsroom/[news]',
                                                query: {news: newsroom[newsroom.length - 1].slug}
                                            }}
                                                  as={`/newsroom/${newsroom[newsroom.length - 1].slug}?lang=${language}`}>
                                                <a className={"text-base leading-5 p-6 text-white w-full"}>
                                                    {newsroom[newsroom.length - 1].title.rendered}
                                                </a>
                                            </Link>
                                        </div>
                                    </News>

                                </div>
                            </div>
                            <div className={"section"}>
                                <div className={"px-40 flex flex-row justify-center items-center"}>
                                    <div className={"w-1/2"}>
                                        <img className={"h-auto object-cover"} src={newsroom_details.image.url}/>
                                    </div>
                                    <div className={" w-1/2  pl-20 "}>
                                        <h2 className={"mb-10 font-medium text-sm"}>#{newsroom[0].name}</h2>
                                        <ScrollableBox
                                            {...lipClassNames}
                                            style={{maxHeight: '440px', overflow: 'auto', backgroundColor: "white"}}
                                        >
                                            <div className={"careerDetails text-xl pr-20"} 
                                                 dangerouslySetInnerHTML={{__html: newsroom_details.editor}}/>
                                        </ScrollableBox>
                                    </div>
                                </div>
                            </div>
                            <div className={"section px-72 xl:px-40"}>
                                <div className={"flex flex-col"}>
                                <h4 style={{fontWeight: "bold", marginLeft: 25, fontSize: 30}}>News</h4>
                                    <div className={"flex flex-wrap justify-start"}>
                                        
                                        {!news ?
                                            <h2 className={"font-bold text-xl"}>
                                                News not found
                                            </h2> : news.map((item, index) => renderNews(item, index))}
                                    </div>
                                    {/* <Pagination className={"self-center"} onChange={handleChange} pageSize={8}
                                                current={pager} defaultCurrent={1}
                                                total={newsroom.length}/> */}
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
    let page = ctx.query.page
    const fetcher = url => axios.get(url).then(res => res.data)
    const newsroom = await fetcher(`${Config.apiUrl}/wp/v2/posts?per_page=100&lang=${query === 'mn' ? query : ''}`)
    const totalPage = Math.ceil(newsroom.length / 8)
    let news;

    if (page === undefined) {
        page = 1
    }




    const pageChecker = (item) => {
        if (item !== undefined) {
            return item
        } else {
            return 1
        }
    }

    if (page <= totalPage) {
        news = await fetcher(`${Config.apiUrl}/wp/v2/posts?per_page=8&page=${page = pageChecker(page)}&lang=${query === 'mn' ? query : ''}`)
    }
    return {newsroom, news, page}
}

export default Index;