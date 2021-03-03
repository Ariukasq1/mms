import React from "react";
import axios from "axios";
import { Config } from "../config";

export default class AboutDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    axios
      .get(`${Config.apiUrl}/wp/v2/posts?_embed&categories=${this.props.catId}`)
      .then((res) =>
        this.setState({
          post: res.data[0],
        })
      )
      .catch((err) => console.log(err));
  }

  renderSupply(post) {
    const items = Object.values(post.acf);

    return (
      <div className="auto-overflow pl-10">
        <h2 className={"text-menuTextColor leading-8 font-bold text-2xl mb-30"}>
          <div
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />
        </h2>

        <div
          class={`grid grid-cols-${
            post.slug.includes("supply") ? "9" : "3"
          } gap-4`}
        >
          {items.map((item, index) => (
            <div key={index} className="supply-item flex flex-col align-center">
              <div className="wrapper mb-5">
                <img
                  src={item.icon ? item.icon : "/images/check.png"}
                  alt="icon"
                />
              </div>
              <h5 style={{ minHeight: post.slug.includes("supply") && "54px" }}>
                {item.name}
              </h5>
              <p>
                <div dangerouslySetInnerHTML={{ __html: item.desc }} />
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { post } = this.state;

    if (!post || Object.keys(post).length === 0) {
      return null;
    }

    return this.renderSupply(post);
  }
}
