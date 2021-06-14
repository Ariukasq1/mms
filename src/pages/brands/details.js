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
      <div className="brand-detail-wrapper">
        <div className="relative grid grid-cols-3 2xl:h-full xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
          <div
            className="col-item p-16 bg-cover bg-center bg-no-repeat h-body object-cover object-center cursor-pointer relative sm:px-10 sm:py-14"
            style={{
              backgroundImage: `url(${getData(brand._embedded, "image")})`,
            }}
          >
            <div
              className="about-brand p-10 sm:px-4 sm:py-0"
              data-aos="flip-down"
            >
              <div className="sub-heading font-bold text-xl">
                <span className="inline-block"></span>
                {__("Brands")}
              </div>
              <div className={"mb-8 logo flex justify-center"}>
                <img className="mt-8" src={logo && logo} alt="brand-logo" />
              </div>
              <div className="slogan mb-8 text-center">
                {slogan && (
                  <div className="slo relative w-full text-2xl heading-tag font-bold uppercase mb-8 ">
                    <blockquote className="border-0">
                      <span className="mt-8">
                        {slogan}
                        <div className="flex justify-center text-wrapper">
                          {country && (
                            <div className="text text-lg font-medium country">
                              <i className="flex flex-col gradient-text font-medium  capitalize">
                                <div className="mb-2">{__("Country")}:</div>
                                {country}
                              </i>
                            </div>
                          )}
                          {founded_year && (
                            <div className="text text-lg font-medium year">
                              <i className="flex gradient-text font-medium justify-center flex-col capitalize">
                                <div className="mb-2">
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
          <div className="col-item p-16 md:py-5 sm:pb-5 sm:pr-5 lg:pb-0">
            <div className={"itemDetailsTexts"}>
              <h3 className="mb-10 text-menuTextColor leading-8 font-bold text-2xl">
                {__("About")}{" "}
                <span>
                  {" "}
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{ __html: brand.title.rendered }}
                  />
                </span>{" "}
              </h3>
              <div
                className={
                  "text-lg pb-10 sm:pb-5    xl:auto-overflow 2xl:auto-overflow"
                }
                dangerouslySetInnerHTML={{
                  __html: about,
                }}
              />
            </div>
            {certificate && (
              <div
                className="certification absolute lg:relative md:relative sm:relative"
                style={{ bottom: "2rem" }}
              >
                <div className="text-base font-bold text-menuTextColor mb-3">
                  {__("Certification & Accreditations")}:
                </div>
                <img className="w-full" src={certificate} alt="certificate" />
              </div>
            )}
          </div>
          <div className="col-item p-16 md:py-5 sm:pr-5 sm:pt-0 lg:pb-0">
            <div className={"itemDetailsTexts"}>
              <h3 className="mb-10 text-menuTextColor leading-8 font-bold text-2xl">
                <span>
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{ __html: brand.title.rendered }}
                  />
                </span>{" "}
                {__("Details")}
              </h3>
              <div
                className={"text-lg pb-10 2xl:auto-overflow xl:auto-overflow"}
                dangerouslySetInnerHTML={{
                  __html: advantage,
                }}
              />
              <div
                className={"text-lg pb-10 auto-overflow"}
                dangerouslySetInnerHTML={{
                  __html: additional,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BrandDetail;
