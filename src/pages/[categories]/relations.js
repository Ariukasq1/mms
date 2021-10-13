import React from "react";
import axios from "axios";
import { Config } from "../../config";
import RelationSlider from "../../components/RelationSlider";
import { __ } from "../../utils";

class ItemRelations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    const { lang } = this.props;

    axios
      .get(
        `${
          Config.apiUrl
        }/wp/v2/posts?_embed&categories=110,111,112&per_page=100&${
          lang === "mn" ? "lang=mn" : "lang="
        }`
      )
      .then((res) =>
        this.setState({
          posts: res.data,
        })
      )
      .catch((err) => console.log(err));
  }

  renderRelations = (title, items) => {
    return (
      <div>
        <h4 className="mb-4 heading-tag capitalize text-xl font-bold">
          {__(title)}
        </h4>
        <RelationSlider
          items={items}
          querySlug={title}
          posts={this.state.posts || []}
        />
      </div>
    );
  };

  render() {
    const { post } = this.props;
    const { brands, capabilities, industries } = (post && post.acf) || {};

    return (
      <div className="px-40 item-relations 2xl:px-20 pt-32 2xl:pt-28 xl:px-24 lg:px-16 md:px-10 sm:pt-2 sm:px-8 sm:h-auto md:h-auto lg:py-10 xl:pt-28 md:py-10">
        <h2 className="text-menuTextColor font-bold text-2xl capitalize mb-3 xl:mb-0 sm:mb-2 2xl:mb-0 ">
          {__("Relations")}
        </h2>
        {(brands || []).length !== 0 && this.renderRelations("brands", brands)}
        {(capabilities || []).length !== 0 &&
          this.renderRelations("capabilities", capabilities)}
        {(industries || []).length !== 0 &&
          this.renderRelations("industries", industries)}
      </div>
    );
  }
}

export default ItemRelations;
