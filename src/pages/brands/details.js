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
      <div className="brand-detail-wrapper h-body overflow-auto sm:overflow-hidden sm:h-auto md:h-auto lg:h-auto lg:pt-28 md:pt-28">
        <div className="relative grid grid-cols-3 h-full lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:h-auto md:h-auto sm:h-auto">
          <div
            className="col-item p-16 bg-cover bg-center bg-no-repeat h-full w-full object-cover object-center cursor-pointer relative sm:px-0 sm:py-5 2xl:p-5 overflow-auto lg:h-auto"
            style={{
              backgroundImage: `url(${getData(brand._embedded, "image")})`,
            }}
          >
            <div
              className="about-brand p-10 sm:px-4 sm:py-0"
              data-aos="flip-down"
            >
              <div className="sub-heading font-bold text-xl sm:text-base">
                <span className="inline-block"></span>
                {__("Brands")}
              </div>
              <div className={"mb-8 logo flex justify-center sm:mb-6"}>
                <img
                  className="mt-8 sm:mt-2"
                  src={logo && logo}
                  alt="brand-logo"
                />
              </div>
              <div className="slogan mb-8 text-center sm:mb-0">
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
          <div className="col-item p-16 2xl:p-6 xl:p-8 md:p-10 sm:p-5 lg:pb-0  overflow-auto lg:h-auto md:h-auto sm:h-auto">
            <div className={"itemDetailsTexts"}>
              <h3 className="mb-10 sm:mb-3 text-menuTextColor leading-8 font-bold text-2xl">
                {__("About")}
                <span>
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{ __html: brand.title.rendered }}
                  />
                </span>
              </h3>
              <div
                className={
                  "text-lg pb-10 mb-10 sm:pb-5 xl:text-base xl:auto-overflow 2xl:auto-overflow md:pb-0 md:mb-0"
                }
                dangerouslySetInnerHTML={{
                  __html: about,
                }}
              />
            </div>
          </div>
          <div className="col-item p-16 2xl:p-6 xl:p-8 md:p-10 sm:p-5 lg:pb-0  overflow-auto lg:h-auto md:h-auto sm:h-auto">
            <div className={"itemDetailsTexts"}>
              <h3 className="mb-10 text-menuTextColor leading-8 font-bold text-2xl">
                <span>
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{ __html: brand.title.rendered }}
                  />
                </span>
                {__("Details")}
              </h3>
              <div
                className={
                  "text-lg xl:text-base pb-10 2xl:auto-overflow xl:auto-overflow"
                }
                dangerouslySetInnerHTML={{
                  __html: advantage,
                }}
              />
              <div
                className={"text-lg xl:text-base pb-10 auto-overflow"}
                dangerouslySetInnerHTML={{
                  __html: additional,
                }}
              />
            </div>
            {certificate && (
              <div
                className="certification lg:relative md:relative sm:relative"
                style={{ bottom: "2rem" }}
              >
                <div className="text-base font-bold text-menuTextColor mb-3">
                  {__("Certification & Accreditations")}:
                </div>
                <img className="w-full" src={certificate} alt="certificate" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BrandDetail;
