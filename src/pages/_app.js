import React from "react";
import "../public/styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min";
import "antd/dist/antd.css";
import "../public/styles/tailwind.css";
import Router from "next/router";
import NProgress from "nprogress";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "next/app";
import axios from "axios";
import { Config } from "../config";
import DataContext from "../components/DataContext";
import "react-scrollable-box/lib/default.css";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, top_menu, bottom_menu }) {
  return (
    <DataContext.Provider value={{ top_menu, bottom_menu }}>
      <div className="next">
        <Component {...pageProps} />
      </div>
    </DataContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const query = appContext.ctx.query.lang;
  const appProps = await App.getInitialProps(appContext);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const top_menu = await fetcher(
    `${Config.menuUrl}/nav-menu-top${query === "mn" ? "?lang=" + query : ""}`
  );
  const bottom_menu = await fetcher(
    `${Config.menuUrl}/nav-menu${query === "mn" ? "?lang=" + query : ""}`
  );
  return { ...appProps, top_menu, bottom_menu };
};

export default MyApp;
