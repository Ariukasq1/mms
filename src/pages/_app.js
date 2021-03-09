import React from "react";
import "../public/styles/fontawesome/css/all.min.css";
import "../public/styles/cf7/cf7-smart-grid.min.css";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../public/styles/tailwind.css";
import "../public/styles/style.min.css";
import Router from "next/router";
import NProgress from "nprogress";
import App from "next/app";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { Config } from "../config";
import DataContext from "../components/DataContext";
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

  React.useEffect(() => {
    AOS.init({ duration: 1500 });
    AOS.refresh();
  }, []);

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
