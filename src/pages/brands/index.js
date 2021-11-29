import React from "react";
import BrandsComponent from "../../components/BrandsComponent";
import { Config } from "../../config";
import { fetcher } from "../../utils";
import FullPage from "../../components/FullPage";

const Brands = ({ brands, brandCategories }) => {
  return (
    <FullPage
      page="brands"
      children={
        <>
          <div className="section brands">
            <BrandsComponent
              brands={brands}
              brandCategories={brandCategories}
            />
          </div>
        </>
      }
    />
  );
};

Brands.getInitialProps = async (ctx) => {
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

  return { brands, brandCategories };
};
export default Brands;
