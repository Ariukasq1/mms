import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

class ItemFacts extends React.Component {
  renderSupport(acf) {
    const { supports } = acf || {};
    const datas = supports && supports.desc.split("<li>");

    return (
      <div className="support">
        <h2 className="text-2xl capitalize font-bold text-menuTextColor mb-12">
          {supports && supports.title}
        </h2>
        <div className="support-content grid gap-6 grid-cols-4">
          {(datas || []).map((data, index) => {
            if (
              data.includes("<ul") ||
              data.includes("<p><!-- /wp:list --></p>")
            ) {
              return null;
            }

            return (
              <div
                className="icon-wrapper bg-white flex items-center justify-center rounded-md mb-4"
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

    if (this.props.showDetail && Object.keys(post).length !== 0) {
      window.fullpage_api.moveTo(2, 0);
    }

    return (
      <div
        className="item-facts h-body object-cover bg-no-repeat bg-cover text-white relative z-0"
        style={{
          backgroundImage: `url(${
            post && post.acf && (post.acf || {}).bg_image
          })`,
        }}
      >
        <div className="px-40 flex itens-center justify-center h-full">
          <div className="grid gap-0 grid-cols-2 my-4">
            {Object.entries((post && post.acf) || {}).map(([key, value]) => {
              if (!key.includes("group")) {
                return null;
              }

              return (
                <div
                  className="fact-item flex items-center justify-center py-8 px-40"
                  key={key}
                >
                  <div className="flex flex-col items-center text-center align-center">
                    <img
                      className="w-20 mb-4 icon"
                      src={value.icon}
                      alt="image"
                    />
                    <div className="desc leading-5 text-lg font-semibold">
                      {value.upper_text}
                    </div>
                    <div className="font-extrabold text-5xl fact-text">
                      {!Number(value.number) ? (
                        value.number
                      ) : (
                        <CountUp
                          start={0}
                          end={Number(value.number)}
                          separator=","
                          duration={3}
                        >
                          {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                              <span ref={countUpRef} />
                            </VisibilitySensor>
                          )}
                        </CountUp>
                      )}
                      <span className="ml-4">{value.number_format}</span>
                    </div>
                    <div className="desc leading-5 text-lg font-semibold">
                      {value.bottom_text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemFacts;
