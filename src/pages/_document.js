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
      <Html >
        <Head />
    
          {/* <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MPQD53D"></iframe>`,
            }}
          /> 

        <body>
          <Main />
          <NextScript />
        </body>


        
          <div id="fb-root"></div>
  

          <script
          dangerouslySetInnerHTML={{
            __html: `
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v10.0'
              });
            };
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            `,
          }}
        />

        <div className="fb-customerchat"
          attribution="biz_inbox"
          page_id="1043670075778655">
        </div> */}

        <script src="lozad.min.js"></script>

      </Html>
    );
  }
}
