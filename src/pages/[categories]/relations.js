import React from "react";
import axios from "axios";
import { Config } from "../../config";
import RelationSlider from "../../components/RelationSlider";
import { __ } from "../../utils";

class ItemRelations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      posts: [],
    };
  }

  componentDidMount() {
    const { currentItemId, lang } = this.props;

    axios
      .get(
        `${Config.apiUrl}/wp/v2/posts?_embed&include[]=${
          currentItemId || 1054
        }&${lang === "mn" ? "lang=mn" : "lang="}`
      )
      .then((res) =>
        this.setState({
          post: res.data[0],
        })
      )
      .catch((err) => console.log(err));

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

  componentWillReceiveProps(nextProps) {
    axios
      .get(
        `${Config.apiUrl}/wp/v2/posts?_embed&include[]=${
          nextProps.currentItemId || 1054
        }&${this.props.lang === "mn" ? "lang=mn" : "lang="}`
      )
      .then((res) =>
        this.setState({
          post: res.data[0],
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
    const { post = {} } = this.state;
    const { brands, capabilities, industries } = (post && post.acf) || {};

    return (
      <div className="px-40 py-10 item-relations xl:pl-40 xl:pr-0 lg:pl-20 lg:pr-0 md:pl-12 md:pr-0 sm:pl-10 sm:pr-0">
        <h2 className="text-menuTextColor font-bold text-2xl capitalize mb-8">
          {__("Relations")}
        </h2>
        {(brands || []).length !== 0 && this.renderRelations("Brands", brands)}
        {(capabilities || []).length !== 0 &&
          this.renderRelations("Capabilities", capabilities)}
        {(industries || []).length !== 0 &&
          this.renderRelations("Industries", industries)}
      </div>
    );
  }
}

export default ItemRelations;
