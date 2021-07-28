import React from "react";
import axios from "axios";
import { Config } from "../config";
import { getData } from "../utils";

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    const { productId } = this.props;

    axios
      .get(
        `${Config.apiUrl}/wp/v2/posts?_embed&include[]=${productId || 2725}&${
          this.props.lang === "mn" ? "lang=mn" : "lang="
        }`
      )
      .then((res) =>
        this.setState({
          post: res.data[0],
        })
      )
      .catch((err) => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    axios
      .get(
        `${Config.apiUrl}/wp/v2/posts?_embed&include[]=${
          nextProps.productId || 2725
        }&${this.props.lang === "mn" ? "lang=mn" : "lang="}`
      )
      .then((res) =>
        this.setState({
          post: res.data[0],
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    const { post = {} } = this.state;

    if (Object.keys(post).length === 0) {
      return null;
    }

    return (
      <div
        className={
          "flex flex-row  rounded-none overflow-hidden border border-solid border-menuTextColor bg-white material"
        }
      >
        <div className={"flex justify-center items-center round-img"}>
          <img
            className={"w-20 h-20 rounded-full m-4"}
            src={getData(post._embedded, "image")}
          />
        </div>
        <div className={"interiorTexts flex flex-col justify-center"}>
          <div className={"font-medium text-black text-base"}>
            {post.title && (
              <div
                dangerouslySetInnerHTML={{
                  __html: post.title.rendered,
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
