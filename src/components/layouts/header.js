import React from "react";
import Head from "next/head";

function Header({ title, image }) {
  let defaultUrl = "";

  if (process.browser) {
    defaultUrl = window.location.href;
  }

  return (
    <>
      <Head>
        <title>{title || "MMS"} - MyMonSource LLC</title>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="wp, gerege" />
        <meta name="description" content="MMS - Description" />
        <meta name="author" content="Gerege" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta property="og:title" content={title || "MMS"} />
        <meta property="og:description" content="MMS description" />
        <meta property="og:url" content={defaultUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={image || "Here is website demo image"}
        />
        <meta property="og:site_name" content="Gerege WP Template" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title || "Gerege WP Template"} />
        <meta name="twitter:url" content={defaultUrl} />
        <meta
          name="twitter:description"
          content="Here is website description"
        />
        <meta
          name="twitter:image"
          content={image || "Here is website demo image"}
        />
        <meta name="twitter:site" content="@your-site-twitter-name" />
        <meta name="twitter:creator" content="@your-site-twitter-name" />
        <meta name="twitter:image:alt" content="Gerege WP Template" />
        <link rel="shortcut icon" id="favicon" href="/favicon.ico"></link>
      </Head>
    </>
  );
}

export default Header;
