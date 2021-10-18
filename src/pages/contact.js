import React from "react";
import Layout from "../components/layouts/Layout";
import Footer from "../components/layouts/footer";
import { Config } from "../config";
import { fetcher } from "../utils";
import FullPage from "../components/FullPage";

const Contact = ({ contact }) => {
  return (
    <Layout>
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
    </Layout>
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
