import React from "react";
import Layout from "../components/layouts/Layout";
import Footer from "../components/layouts/footer";
import { Config } from "../config";
import { fetcher } from "../utils";

const Contact = (props) => {
  return (
    <Layout>
      <Footer contact={props.contact} />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const query = ctx.query.lang;

  const contact = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=235&${
      query === "mn" ? "lang=" + query : ""
    }`
  );

  return { props: { contact } };
};

export default Contact;
