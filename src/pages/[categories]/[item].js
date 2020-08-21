import React, {useContext, useEffect} from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/layouts/Layout";
import {configureLanguage} from "../../utils/language";
import axios from "axios";
import {Config} from "../../config";


const Item = ({subcategory}) => {
    const router = useRouter();
    const {item} = router.query

    return (
        <Layout>
            <div>{item}</div>
            <div>{item}</div>
            <div>{item}</div>
            <div>{item}</div>
            <div>{item}</div>
            <div>{item}</div>
        </Layout>
    );
};

Item.getInitialProps = async (ctx) => {
    const language = configureLanguage(ctx);
    const query = ctx.query.lang;
    console.log(ctx.query)
    const fetcher = url => axios.get(url).then(res => res.data)
    const subcategory = await fetcher(`${Config.apiUrl}/wp/v2/posts?slug=${ctx.query.item}&${query === 'mn' ? '?lang=' + query : ''}`)
    return { subcategory}
}


export default Item;