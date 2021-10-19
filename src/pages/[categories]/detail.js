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
        <h2 className="text-2xl capitalize font-bold text-menuTextColor mb-8 xl:mb-5 md:px-10 sm:leading-7 2xl:mb-3">
          {supports && (
            <div dangerouslySetInnerHTML={{ __html: supports.title }} />
          )}
        </h2>
        <div className="support-content grid gap-6 grid-cols-4 lg:gap-4 md:gap-2 md:px-10 md:pb-10 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 xl:grid-cols-3 overflow-auto 2xl:h-80 xl:h-80 overflow-x-hidden lg:mb-5">
          {(datas || []).map((data, index) => {
            if (
              data.includes("<ul") ||
              data.includes("<p><!-- /wp:list --></p>")
            ) {
              return null;
            }

            return (
              <div
                className={`icon-wrapper bg-white flex justify-center rounded-md ${noFilter}`}
                key={index}
              >
                <div
                  className="flex flex-col items-center text-base text-center font-medium px-4 py-5 3xl:py-2 3xl:px-0 2xl:p-3 sm:text-xs  xl:py-2 xl:px-2 xl:text-xs leading-5 "
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
      <div className="category-item ">
        <div className="xl:pl-20 md:pl-0 sm:px-0 lg:px-0">
          <div className="flex md:block sm:block lg:block h-body sm:h-auto md:h-auto lg:h-auto md:overflow-hidden sm:overflow-hidden lg:mb-10 md:mb-10 sm:mb-10">
            <div className="w-1/2 flex flex-col mx-20 mt-5 2xl:ml-20 2xl:mr-10 xl:ml-0 xl:mr-8 lg:ml-0 lg:mr-5 lg:mt-5 md:mt-5 lg:w-full md:w-full md:mx-0 sm:w-full xl:mt-5 lg:px-20 sm:px-8 sm:m-0">
              {this.renderSupport(post.acf)}
            </div>
            <div className="w-1/2 md:w-full sm:w-full lg:w-full h-body sm:h-86">
              <div
                className="item-image bg-cover bg-no-repeat h-full object-cover object-center relative sm:bg-center "
                style={{
                  backgroundImage: `url(${getData(post._embedded, "image")})`,
                }}
              >
                <div className="inner-content">
                  <div className="inner-content-overlay absolute inset-0" />
                  <div className="inner-content-detail text-white absolute">
                    <h2 className="block text-2xl font-bold capitalize text-white mb-4 sm:text-xl sm:mb-0">
                      {post.title && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                      )}
                    </h2>
                    <div className="mb-4 sm:mb-0">
                      <div
                        className="text-lg font-medium sm:text-sm xl:text-tiny"
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
