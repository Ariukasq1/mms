import React from "react";
import { getData, __ } from "../../utils";

class BrandDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }

  render() {
    const { items } = this.props;

    const brand = items ? items[0] : {};
    const {
      logo,
      about,
      brochure,
      slogan,
      country,
      founded_year,
      advantage,
      additional,
      certificate,
    } = brand.acf || {};
    return (
      <div className="brand-detail-wrapper h-body sm:overflow-hidden sm:h-auto md:h-auto lg:h-auto lg:pt-28 md:pt-28">
        <div className="relative h-full flex lg:block md:block sm:block lg:h-auto md:h-auto sm:h-auto">
          <div
            className="w-1/3 col-item p-16 bg-cover bg-center bg-no-repeat h-full object-cover object-center cursor-pointer relative sm:px-0 sm:py-5 2xl:p-5 xl:p-3 overflow-y-auto lg:h-auto md:h-auto sm:h-auto lg:w-full md:w-full sm:w-full overflow-x-hidden"
            style={{
              backgroundImage: `url(${getData(brand._embedded, "image")})`,
            }}
          >
            <div
              className="about-brand p-10 sm:px-4 sm:py-0 xl:p-3"
              data-aos="flip-down"
            >
              <div className="sub-heading font-bold text-xl sm:text-base">
                <span className="inline-block"></span>
                {__("Brands")}
              </div>
              <div className={"mb-8 logo flex justify-center sm:mb-6 xl:mb-0"}>
                <img
                  className="mt-8 sm:mt-2"
                  src={logo && logo}
                  alt="brand-logo"
                />
              </div>
              <div className="slogan mb-8 text-center sm:mb-0 xl:mb-0">
                {slogan && (
                  <div className="slo relative w-full text-2xl heading-tag font-bold uppercase mb-8 sm:pb-2 sm:mb-0">
                    <blockquote className="border-0">
                      <span className="mt-8 xl:text-lg  sm:text-sm sm:px-2">
                        {slogan}
                        <div className="flex justify-center text-wrapper">
                          {country && (
                            <div className="text xl:text-base text-lg font-medium country">
                              <i
                                className="flex flex-col gradient-text font-medium  capitalize"
                                style={{ display: "block" }}
                              >
                                <div className="mb-2 sm:text-sm">
                                  {__("Country")}:
                                </div>
                                {country}
                              </i>
                            </div>
                          )}
                          {founded_year && (
                            <div className="text xl:text-base text-lg font-medium year">
                              <i
                                className="flex gradient-text font-medium justify-center flex-col capitalize"
                                style={{ display: "block" }}
                              >
                                <div className="mb-2 sm:text-sm">
                                  {__("Founded year")}:
                                </div>
                                <div>{founded_year}</div>
                              </i>
                            </div>
                          )}
                        </div>
                      </span>
                    </blockquote>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-2/3 flex flex-col lg:w-full md:w-full sm:w-full lg:h-auto md:h-auto sm:h-auto brandText">
            <div className="flex lg:block md:block sm:block">
              <div className="col-item p-16 w-1/2 3xl:p-5 2xl:p-6 xl:p-5 lg:w-full md:w-full sm:w-full md:p-10 sm:p-5 lg:pb-0 overflow-auto">
                <div className={"itemDetailsTexts"}>
                  <h3 className="mb-10 sm:mb-3 text-menuTextColor leading-8 font-bold text-2xl">
                    {__("About")}
                    <span>
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: brand.title.rendered,
                        }}
                      />
                    </span>
                  </h3>
                  <div
                    className={
                      "text-lg sm:pb-5 xl:text-base xl:auto-overflow 2xl:auto-overflow md:pb-0 md:mb-0"
                    }
                    dangerouslySetInnerHTML={{
                      __html: about,
                    }}
                  />
                </div>
              </div>
              <div className="col-item p-16 w-1/2 3xl:p-5 2xl:p-6 xl:p-5 lg:w-full md:w-full sm:w-full md:p-10 sm:p-5 lg:pb-0 overflow-auto">
                <div className={"itemDetailsTexts"}>
                  <h3 className="mb-10 text-menuTextColor leading-8 font-bold text-2xl">
                    <span>
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: brand.title.rendered,
                        }}
                      />
                    </span>
                    {__("Details")}
                  </h3>
                  <div
                    className={
                      "text-lg xl:text-base 2xl:auto-overflow xl:auto-overflow"
                    }
                    dangerouslySetInnerHTML={{
                      __html: advantage,
                    }}
                  />
                  <div
                    className={"text-lg xl:text-base auto-overflow"}
                    dangerouslySetInnerHTML={{
                      __html: additional,
                    }}
                  />
                </div>
              </div>
            </div>
            {certificate && (
              <div className="certification absolute lg:relative md:relative sm:relative px-16 sm:px-5">
                <div className="text-base font-bold text-menuTextColor mb-3">
                  {__("Certification & Accreditations")}:
                </div>
                <img
                  className="w-full lg:mb-10 md:mb-5 sm:mb-5"
                  src={certificate}
                  alt="certificate"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BrandDetail;
