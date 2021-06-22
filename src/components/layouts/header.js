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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&family=Balsamiq+Sans:ital,wght@0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body style={{ margin: 0 }}>
                    {/* FB chat */}
                    <div id="fb-root"></div>
                    <div id="fb-customer-chat" class="fb-customerchat"> </div>                    
                    <script dangerouslySetInnerHTML={{
                        __html: `var chatbox = document.getElementById('fb-customer-chat');
                        chatbox.setAttribute("page_id", "1043670075778655");
                        chatbox.setAttribute("attribution", "biz_inbox");
                        window.fbAsyncInit = function() {
                          FB.init({
                            xfbml            : true,
                            version          : 'v11.0'
                          });
                        };
                  
                        (function(d, s, id) {
                          var js, fjs = d.getElementsByTagName(s)[0];
                          if (d.getElementById(id)) return;
                          js = d.createElement(s); js.id = id;
                          js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                          fjs.parentNode.insertBefore(js, fjs);
                        }(document, 'script', 'facebook-jssdk'));`}}
                    />
        </body>
    </>
  );
}

export default Header;
