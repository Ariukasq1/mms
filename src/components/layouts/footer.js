import React from "react";
import Share from "../Share";

const styles={
  zIndex: 20,
  backgroundColor: "#262626"
}

function Footer({ data }) {
  const { contacts, address } = data[0].acf;
  return (
    <footer
      className={"bg-contact text-white h-screen"}
      style={{ paddingTop: "116px" }}
    >
      <div
        className={
          "flex flex-row align-center justify-evenly px-72 py-20 xl:px-24 sm:px-12 sm:flex-col "
        } style={{backgroundColor: "#262626"}}
      >
        <div className={"flex flex-col w-1/3 px-16 sm:w-full sm:px-4"} style={styles}>
          <h2 className={"text-lg font-medium text-white"}>Contacts</h2>
          <div className={"flex flex-row"}>
            <p className={"text-lg  text-white"}>Tel: </p>
            <p className={"text-lg  text-white"}>{contacts.tel}</p>
          </div>
          <div className={"flex flex-row"}>
            <p className={"text-lg  text-white"}>Fax: </p>
            <p className={"text-lg  text-white"}>{contacts.fax}</p>
          </div>
          <div className={"flex flex-row"}>
            <p className={"text-lg  text-white"}>E-mail: </p>
            <p className={"text-lg  text-white"}>{contacts.email}</p>
          </div>

          <Share />
          
        </div>
        <div className={"flex flex-col w-1/3 px-16 sm:w-full sm:px-4"} style={styles}>
          <div className={"flex flex-col mb-10 sm:w-full"}>
            <h2 className={"text-lg font-medium text-white"}>
              {address.office.name}
            </h2>
            <p className={"text-lg  text-pink-100"}>{address.office.address}</p>
          </div>
          <div className={"flex flex-col mb-10 sm:w-full"}>
            <h2 className={"text-lg font-medium text-white"}>
              {address.office_copy.name}
            </h2>
            <p className={"text-lg  text-pink-100"}>
              {address.office_copy.address}
            </p>
          </div>
          <div className={"flex flex-col mb-10 sm:w-full"}>
            <h2 className={"text-lg font-medium text-white"}>
              {address.hunnu_mall_showroom.name}
            </h2>
            <p className={"text-lg  text-pink-100"}>
              {address.hunnu_mall_showroom.address}
            </p>
          </div>
        </div>
        <div className={"flex flex-col w-1/3 px-16 sm:w-full sm:px-4"} style={styles}>
          <h2 className={"text-lg font-medium text-white"}>
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
              className={"sendButton bg-transparent font-medium text-base"}
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
