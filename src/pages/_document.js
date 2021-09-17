import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { getLangParam } from "../utils";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={getLangParam()}>
        <Head>
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-207767802-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-207767802-1');`,
            }}
          />
        </Head>
        <body style={{ margin: 0 }}>
          {/* FB chat */}
          <div id="fb-root"></div>
          <div id="fb-customer-chat" className="fb-customerchat"></div>
          <script
            dangerouslySetInnerHTML={{
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
                        }(document, 'script', 'facebook-jssdk'));`,
            }}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
