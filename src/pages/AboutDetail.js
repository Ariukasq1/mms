import React from "react";
import axios from "axios";
import { Config } from "../config";
import { getLangParam } from "../utils";

export default class AboutDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    const currentLanguage = getLangParam();

    axios
      .get(
        `${Config.apiUrl}/wp/v2/posts?_embed&categories=${this.props.catId}&${
          currentLanguage === "mn" ? "lang=mn" : "lang="
        }`
      )
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
      <div className="lg:pl-5 sm:pl-0">
        <div
          className={`grid grid-cols-${
            post.slug.includes("supply") ? "9" : "3"
          } gap-4 xl:grid-cols-5 2xl:grid-cols-5 2xl:h-72 2xl:overflow-auto lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2`}
        >
          {items.map((item, index) => {
            if (!item) {
              return null;
            }

            return (
              <div
                key={index}
                className="supply-item flex flex-col items-center"
              >
                <div className="wrapper mb-5">
                  <img
                    src={item.icon ? item.icon : "/images/check.png"}
                    alt="icon"
                  />
                </div>
                <h5
                  style={{ minHeight: post.slug.includes("supply") && "54px" }}
                >
                  {item.name}
                </h5>
                <div className="desc">
                  <div dangerouslySetInnerHTML={{ __html: item.desc }} />
                </div>
              </div>
            );
          })}
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
