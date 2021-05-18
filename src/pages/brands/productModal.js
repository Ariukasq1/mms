import React from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import Link from "next/link";
import { DownloadOutlined } from "@ant-design/icons";
import { Config } from "../../config";
import { getData, __ } from "../../utils";

class ProductModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: {},
      items: [],
      showModal: false,
      currentItem: {},
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

  onShowModal = (product) => {
    this.setState({ showModal: !this.state.showModal }, () => {
      if (product) {
        this.setState({ currentItem: product });
      }
    });
  };

  renderData(currentItemId, lang) {
    axios
      .get(
        `${Config.apiUrl}/wp/v2/posts?_embed&categories=${
          currentItemId ? currentItemId : 267
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
    const { items, showModal, currentItem } = this.state;
    const { pdf_file } = currentItem.acf || {};

    const content = (items || []).map((product, index) => {
      return (
        <>
          <div
            key={index}
            className="brand-p-item mb-20"
            onClick={this.onShowModal.bind(this, product)}
          >
            <div className="font-medium text-black text-xl mb-4 title">
              <div
                dangerouslySetInnerHTML={{ __html: product.title.rendered }}
              />
            </div>
            <div className="image-wrapper">
              <img
                className="object-cover object-center h-body w-full"
                src={getData(product._embedded, "image")}
                alt={product.title.rendered}
              />
            </div>
          </div>
        </>
      );
    });

    console.log(currentItem);

    return (
      <div className="grid grid-cols-6 gap-6">
        {content}
        {currentItem && (
          <Modal
            title={currentItem.title && currentItem.title.rendered}
            visible={showModal}
            onOk={this.onShowModal}
            onCancel={this.onShowModal}
          >
            <img
              className="product-image"
              src={getData(currentItem._embedded, "image")}
              alt="product"
            />
            {currentItem.content && (
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentItem.content.rendered,
                  }}
                />
              </p>
            )}
            {pdf_file && (
              <Button type="primary" shape="round" icon={<DownloadOutlined />}>
                <a href={pdf_file} target="_blank" download>
                  Download PDF
                </a>
              </Button>
            )}
          </Modal>
        )}
      </div>
    );
  }
}

export default ProductModal;
