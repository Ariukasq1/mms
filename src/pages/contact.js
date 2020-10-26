import React from "react";
import Layout from "../components/layouts/Layout";
import Footer from "../components/layouts/footer";
import { Config } from "../config";
import { fetcher } from "../utils";

const Contact = ({ contact }) => {
  return (
    <Layout>
      <Footer data={contact} />
    </Layout>
  );
};

Contact.getInitialProps = async (ctx) => {
  const query = ctx.query.lang;

  const contact = await fetcher(
    `${Config.apiUrl}/wp/v2/navigation_menus?slug=contact&${
      query === "mn" ? "?lang=" + query : ""
    }`
  );
  return { contact };
};

export default Contact;
