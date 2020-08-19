import React from 'react'
import "../public/styles/styles.scss";
// import '../public/styles/fontawesome/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min'
import 'antd/dist/antd.css';
import "../public/styles/tailwind.css"
import Router from 'next/router';
import NProgress from 'nprogress';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Router.events.on('routeChangeStart', () => {
    NProgress.start()
});

Router.events.on('routeChangeComplete', () => {
    NProgress.done()
});

Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {
    return (
        <div className="next">
                <Component {...pageProps} />
        </div>
    );
}

export default MyApp;