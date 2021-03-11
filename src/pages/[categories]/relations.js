import React from "react";
import axios from "axios";
import { Config } from "../../config";
import RelationSlider from "../../components/RelationSlider";

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
          {title}
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

    if (this.props.showDetail && Object.keys(post).length !== 0) {
      window.fullpage_api.moveTo(2, 0);
    }

    const { brands, capabilities, industries } = (post && post.acf) || {};

    return (
      <div className="px-40 py-10 item-relations">
        <h2 className="text-menuTextColor font-bold text-2xl capitalize mb-8">
          Relations
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
