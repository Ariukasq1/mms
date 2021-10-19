import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

class ItemFacts extends React.Component {
  render() {
    const { post = {} } = this.props;

    if (this.props.showDetail && Object.keys(post).length !== 0) {
      window.fullpage_api.moveTo(2, 0);
    }

    return (
      <div
        className="item-facts h-body sm:h-auto object-cover bg-no-repeat bg-cover text-white relative z-0 flex md:h-auto lg:h-auto"
        style={{
          backgroundImage: `url(${
            post && post.acf && (post.acf || {}).bg_image
          })`,
        }}
      >
        <div className="px-40 flex items-center justify-center  md:h-full 2xl:h-full xl:h-full lg:px-0 md:pl-10 md:pr-5 sm:pr-5 sm:pl-10 sm:py-10 overflow-auto">
          <div className="grid gap-0 grid-cols-2 md:grid-cols-1 sm:grid-cols-1 h-full">
            {Object.entries((post && post.acf) || {}).map(([key, value]) => {
              if (!key.includes("group")) {
                return null;
              }

              return (
                <div
                  className="fact-item flex items-center justify-center py-8 px-20 2xl:px-5 2xl:py-4 md:p-5 sm:p-5 xl:px-10 xl:py-3"
                  key={key}
                >
                  <div className="flex flex-col items-center text-center align-center">
                    <img
                      className="w-20 mb-4 icon xl:mb-1"
                      src={value.icon}
                      alt="image"
                    />
                    <div className="desc leading-5 text-lg font-semibold xl:text-tiny">
                      {value.upper_text}
                    </div>
                    <div className="font-extrabold text-5xl fact-text xl:text-4xl">
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
