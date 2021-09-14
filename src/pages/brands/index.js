import React from "react";
import Layout from "../../components/layouts/Layout";
import BrandsComponent from "../../components/BrandsComponent";
import { Config } from "../../config";
import { fetcher } from "../../utils";
import FullPage from "../../components/FullPage";

const Brands = (props) => {
  return (
    <Layout>
      <FullPage
        children={
          <div className="section brands">
            <BrandsComponent
              brands={props.brands}
              brandCategories={props.brandCategories}
            />
          </div>
        }
      />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const lang = ctx.query.lang;

  const brandCategories = await fetcher(
    `${Config.apiUrl}/wp/v2/categories?parent=112&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  const brands = await fetcher(
    `${Config.apiUrl}/wp/v2/posts?_embed&categories=112&per_page=80&${
      lang === "mn" ? "lang=" + lang : ""
    }`
  );

  return { props: { brands, brandCategories } };
};
export default Brands;
