import React from "react";
import {
  PhoneOutlined,
  PrinterOutlined,
  MailOutlined,
  HomeOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { __ } from "../../utils";

class Footer extends React.Component {
  renderAddress(address) {
    const items = Object.values(address || {}) || [];

    if (items.length === 0) {
      return null;
    }

    return items.map((item, index) => {
      if (!item.name) {
        return null;
      }

      return (
        <div key={index} className={"flex flex-col mb-10 sm:w-full"}>
          <h2 className={"text-lg font-bold text-white mb-8"}>{item.name}</h2>
          <p
            className={"text-lg flex items-baseline text-pink-100 md:text-tiny"}
          >
            <HomeOutlined className="pr-2" /> {item.address}
          </p>
        </div>
      );
    });
  }

  render() {
    const { contact } = this.props;

    if (!contact || contact.length === 0) {
      return null;
    }

    const data = contact[0];

    const { address, tel, fax, email, social } = data.acf || {};
    const { facebook, instagram, linkedin, youtube, twitter } = social || {};

    return (
      <footer
        className={
          "bg-contact relative text-white h-full overflow-auto sm:h-auto md:h-auto"
        }
      >
        <div
          className="footer-responsive justify-evenly px-40 flex py-56 xl:px-24 lg:px-20 lg:py-5 md:px-2 2xl:py-20 xl:py-10 sm:p-0 "
          style={{ backgroundColor: "#262626" }}
        >
          <div
            className={
              "flex flex-col footer-items px-8 sm:w-full sm:px-4 xl:px-6 lg:px-0 md:px-0"
            }
          >
            <h2 className={"text-lg font-bold mb-8 text-white"}>
              {__("Contacts")}
            </h2>
            <div className={"flex flex-row"}>
              <p className={"text-lg flex items-center text-white"}>
                <PhoneOutlined className="pr-2" /> {__("Tel")}:
              </p>
              <p className={"text-lg  text-white md:text-tiny"}> {tel}</p>
            </div>
            <div className={"flex flex-row"}>
              <p className={"text-lg flex items-center text-white"}>
                <PrinterOutlined className="pr-2" /> {__("Fax")}:
              </p>

              <p className={"text-lg  text-white md:text-tiny"}> {fax}</p>
            </div>
            <div className={"flex flex-row"}>
              <p className={"text-lg flex items-center text-white"}>
                <MailOutlined className="pr-2" /> {__("E-mail")}:
              </p>
              <p className={"text-lg  text-white md:text-tiny"}> {email}</p>
            </div>
            <div
              className={"flex flex-row socials mt-20 sm:mt-5 md:mt-5 lg:mt-5"}
            >
              {facebook && (
                <a
                  className="flex items-center justify-center"
                  href={facebook}
                  target="_blank"
                >
                  <FacebookOutlined />
                </a>
              )}
              {instagram && (
                <a
                  className="flex items-center justify-center"
                  href={instagram}
                  target="_blank"
                >
                  <InstagramOutlined />
                </a>
              )}
              {linkedin && (
                <a
                  className="flex items-center justify-center"
                  href={linkedin}
                  target="_blank"
                >
                  <LinkedinOutlined twoToneColor="#eb2f96" />
                </a>
              )}
              {youtube && (
                <a
                  className="flex items-center justify-center"
                  href={youtube}
                  target="_blank"
                >
                  <YoutubeOutlined />
                </a>
              )}
              {twitter && (
                <a
                  className="flex items-center justify-center"
                  href={twitter}
                  target="_blank"
                >
                  <TwitterOutlined />
                </a>
              )}
            </div>
          </div>
          <div
            className={
              "flex flex-col footer-items px-8 sm:w-full sm:px-4 lg:px-4 md:px-2"
            }
          >
            {this.renderAddress(address)}
          </div>
          <div
            className={
              "flex flex-col footer-items-input px-8 sm:w-full sm:px-4 md:px-2"
            }
          >
            <h2 className={"text-lg font-bold mb-8 text-white xl:mb-5"}>
              {__("Please contact us")}
            </h2>
            <form className={"relative w-full"}>
              <div className={"relative w-full my-4"}>
                <label className={"px-2 font-medium text-base"} htmlFor="fname">
                  {__("Full name")}
                </label>
                <input
                  className={"font-lg"}
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder={__("Enter full name")}
                  required
                />
              </div>

              <div className={"relative w-full my-4"}>
                <label className={"px-2 font-medium text-base"} htmlFor="lname">
                  {__("Contact Email")}
                </label>
                <input
                  className={"font-lg"}
                  type="text"
                  id="email"
                  name="email"
                  placeholder={__("Enter email")}
                  required
                />
              </div>

              <div className={"relative w-full my-4"}>
                <label className={"px-2 font-medium text-base"} htmlFor="lname">
                  {__("Message")}
                </label>
                <textarea
                  className={"h-40"}
                  id="Message"
                  name="message"
                  placeholder={__("Enter text")}
                  required
                />
              </div>

              <input
                className={
                  "sendButton bg-transparent font-medium text-base w-full"
                }
                type="submit"
                value={__("Send")}
              />
            </form>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
