import React from "react";
import Footer from "../components/layouts/footer";
import { Config } from "../config";
import { fetcher } from "../utils";
import FullPage from "../components/FullPage";

const Contact = ({ contact }) => {
  return (
    <FullPage
      page="contact"
      children={
        <>
          <div className="section footer">
            <Footer contact={contact} />
          </div>
        </>
      }
    />
  );
};

Contact.getInitialProps = async (ctx) => {
  const query = ctx.query.lang;

  const contact = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=235&${
      query === "mn" ? "lang=" + query : ""
    }`
  );

  return { contact };
};

export default Contact;
