import React from "react";
import { getData } from "../../utils";

class ItemDetail extends React.Component {
  renderSupport(acf) {
    const { supports } = acf || {};
    const datas = supports && supports.desc.split("<li>");
    const noFilter =
      supports &&
      supports.title === "Professional material supply" &&
      "noFilter";

    return (
      <div className="support">
        <h2 className="text-2xl capitalize font-bold text-menuTextColor mb-12 md:pl-20">
          {supports && (
            <div dangerouslySetInnerHTML={{ __html: supports.title }} />
          )}
        </h2>
        <div className="support-content grid gap-6 grid-cols-4 lg:gap-4 md:gap-2 md:pr-5 md:pl-20 sm:grid-cols-2 md:grid-cols-3">
          {(datas || []).map((data, index) => {
            if (
              data.includes("<ul") ||
              data.includes("<p><!-- /wp:list --></p>")
            ) {
              return null;
            }

            return (
              <div
                className={`icon-wrapper bg-white flex justify-center rounded-md mb-4 ${noFilter}`}
                key={index}
              >
                <div
                  className="flex flex-col items-center text-base text-center font-medium px-6 leading-5"
                  dangerouslySetInnerHTML={{ __html: data }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const { post = {} } = this.props;

    if (Object.keys(post).length !== 0) {
      typeof window !== "undefined" &&
        window.fullpage_api &&
        window.fullpage_api.moveTo(2, 0);
    }

    return (
      <div className="category-item">
        <div className="pl-24 xl:pl-12 md:pl-0 sm:px-0 lg:px-0" >
          <div className="flex md:block sm:block lg:block">
            <div className="w-1/2 flex flex-col mx-12 mt-20 lg:ml-0 lg:mr-5 lg:mt-5 md:mt-5 lg:w-full md:w-full md:mx-0 sm:w-full xl:mt-5 lg:px-20 sm:px-10 sm:m-0">
              {this.renderSupport(post.acf)}
            </div>
            <div className="w-1/2 md:w-full sm:w-full lg:w-full">
              <div
                className="item-image bg-cover bg-no-repeat h-body object-cover object-center relative"
                style={{
                  backgroundImage: `url(${getData(post._embedded, "image")})`,
                }}
              >
                <div className="inner-content">
                  <div className="inner-content-overlay absolute inset-0" />
                  <div className="inner-content-detail text-white absolute">
                    <h2 className="block text-2xl font-bold capitalize text-white mb-4">
                      {post.title && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                      )}
                    </h2>
                    <div className="auto-overflow mb-4">
                      <div
                        className="text-lg font-medium"
                        dangerouslySetInnerHTML={{
                          __html: post.content && post.content.rendered,
                        }}
                      />
                    </div>
                    <div className="divider block bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
