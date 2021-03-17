import React from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Config } from "../../config";
import { getData, SampleNextArrow, SamplePrevArrow, __ } from "../../utils";

const settingsProductItems = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  rows: 2,
  autoplay: false,
  autoplaySpeed: 3000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

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

    if ((items || []).length > 8) {
      return <Slider {...settingsProductItems}>{content}</Slider>;
    }

    return (
      <div className="grid grid-cols-4 gap-6">
        {content}
        {currentItem && (
          <Modal
            title={currentItem.title && currentItem.title.rendered}
            visible={showModal}
            onOk={this.onShowModal}
            onCancel={this.onShowModal}
          >
            <img src={getData(currentItem._embedded, "image")} alt="product" />
            <Button type="primary" shape="round" icon={<DownloadOutlined />}>
              Download PDF
            </Button>
          </Modal>
        )}
      </div>
    );
  }
}

export default ProductModal;
