import React from "react";
import {
  PhoneOutlined,
  PrinterOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { __ } from "../../utils";

class Footer extends React.Component {
  renderAddress(address) {
    const items = Object.values(address || {}) || [];

    if (items.length === 0) {
      return null;
    }

    return items.map((item, index) => (
      <div key={index} className={"flex flex-col mb-10 sm:w-full"}>
        <h2 className={"text-lg font-bold text-white mb-8"}>{item.name}</h2>
        <p className={"text-lg  flex items-baseline text-pink-100"}>
          {" "}
          <HomeOutlined className="pr-2" /> {item.address}
        </p>
      </div>
    ));
  }

  render() {
    const { contact } = this.props;

    if (contact.length === 0) {
      return null;
    }

    const data = contact[0];

    const { address, tel, fax, email, social } = data.acf || {};
    const { facebook, instagram, linkedin, youtube, twitter } = social || {};

    return (
      <footer className={"bg-contact relative text-white h-screen"}>
        <div
          className={
            "flex flex-row justify-evenly px-40 py-40 xl:px-24 sm:px-12 sm:flex-col "
          }
          style={{ backgroundColor: "#262626" }}
        >
          <div className={"flex flex-col w-1/4 px-8 sm:w-full sm:px-4"}>
            <h2 className={"text-lg font-bold mb-8 text-white"}>Contacts</h2>
            <div className={"flex flex-row"}>
              <p className={"text-lg flex items-center text-white"}>
                <PhoneOutlined className="pr-2" /> Tel:{" "}
              </p>{" "}
              &emsp;
              <p className={"text-lg  text-white"}> {tel}</p>
            </div>
            <div className={"flex flex-row"}>
              <p className={"text-lg flex items-center text-white"}>
                <PrinterOutlined className="pr-2" /> Fax:{" "}
              </p>
              &emsp;
              <p className={"text-lg  text-white"}> {fax}</p>
            </div>
            <div className={"flex flex-row"}>
              <p className={"text-lg flex items-center text-white"}>
                <MailOutlined className="pr-2" /> E-mail:{" "}
              </p>
              &emsp;
              <p className={"text-lg  text-white"}> {email}</p>
            </div>
            <div className={"flex flex-row socials"}>
              {facebook && (
                <a
                  className="flex items-center justify-center"
                  href={facebook}
                  target="_blank"
                >
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
              )}
              {instagram && (
                <a
                  className="flex items-center justify-center"
                  href={instagram}
                  target="_blank"
                >
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              )}
              {linkedin && (
                <a
                  className="flex items-center justify-center"
                  href={linkedin}
                  target="_blank"
                >
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
              )}
              {youtube && (
                <a
                  className="flex items-center justify-center"
                  href={youtube}
                  target="_blank"
                >
                  <i className="fab fa-youtube" aria-hidden="true"></i>
                </a>
              )}
              {twitter && (
                <a
                  className="flex items-center justify-center"
                  href={twitter}
                  target="_blank"
                >
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
              )}
            </div>
          </div>
          <div className={"flex flex-col w-1/3 px-8 sm:w-full sm:px-4"}>
            {this.renderAddress(address)}
          </div>
          <div className={"flex flex-col w-1/3 px-8 sm:w-full sm:px-4"}>
            <h2 className={"text-lg font-bold mb-8 text-white"}>
              Please contact us
            </h2>
            <form className={"relative w-full"}>
              <div className={"relative w-full my-4"}>
                <label className={"px-2 font-medium text-base"} htmlFor="fname">
                  Full name
                </label>
                <input
                  className={"font-lg"}
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className={"relative w-full my-4"}>
                <label className={"px-2 font-medium text-base"} htmlFor="lname">
                  Contact Email
                </label>
                <input
                  className={"font-lg"}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className={"relative w-full my-4"}>
                <label className={"px-2 font-medium text-base"} htmlFor="lname">
                  Message
                </label>
                <textarea
                  className={"h-40"}
                  id="Message"
                  name="message"
                  placeholder="Enter text"
                  required
                />
              </div>

              <input
                className={
                  "sendButton bg-transparent font-medium text-base w-full"
                }
                type="submit"
                value="Send"
              />
            </form>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
