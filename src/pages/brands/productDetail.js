import React from "react";
import { PictureOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import axios from "axios";
import { Config } from "../../config";
import {
  fetcher,
  getData,
  SampleNextArrow,
  SamplePrevArrow,
  __,
} from "../../utils";
import Products from "./products";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: {},
      items: [],
    };
  }

  componentDidMount() {
    const { currentItemId, lang } = this.props;
    this.renderData(currentItemId, lang);
  }

  componentWillReceiveProps(nextProps) {
    const { currentItemId, lang } = nextProps;
    this.renderData(currentItemId, lang);
  }

  renderData(currentItemId, lang) {
    axios
      .get(
        `${Config.apiUrl}/wp/v2/categories?parent=${
          currentItemId ? currentItemId : 222
        }&per_page=40&${lang === "mn" ? "lang=mn" : "lang="}`
      )
      .then((res) =>
        this.setState({
          items: res.data,
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    return <Products items={this.state.items} />;
  }
}

export default ProductDetail;
