import React from 'react';
import Layout from "../components/layouts/Layout";
import Footer from "../components/layouts/footer";
import {configureLanguage} from "../utils/language";
import axios from "axios";
import {Config} from "../config";

const Contact = ({contact}) => {
    return (
        <Layout>
            <Footer data={contact}/>
        </Layout>
    );
};

Contact.getInitialProps = async (ctx) => {
    const language = configureLanguage(ctx);
    const query = ctx.query.lang;
    const fetcher = url => axios.get(url).then(res => res.data)
    const contact = await fetcher(`${Config.apiUrl}/wp/v2/navigation_menus?slug=contact&${query === 'mn' ? '?lang=' + query : ''}`)
    return {contact}
}

export default Contact;