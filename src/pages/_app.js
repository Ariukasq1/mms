import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../public/styles/tailwind.css";
import "../public/styles/styles.scss";
import Router from "next/router";
import NProgress from "nprogress";
import App from "next/app";
import axios from "axios";
import { Config } from "../config";
import DataContext from "../components/DataContext";
import "./style.css";
import { setLocale } from "../utils";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, top_menu, bottom_menu, lang }) {
  const [isLangSetted, setLangState] = React.useState(false);

  if (!isLangSetted) {
    setLocale(lang === "mn" ? "mn" : "en", () => {
      setLangState(true);
    });
  }

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

  return { ...appProps, top_menu, bottom_menu, lang: query };
};

export default MyApp;
