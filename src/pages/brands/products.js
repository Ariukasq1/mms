import React from "react";
import { PictureOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow, __ } from "../../utils";

class Products extends React.Component {
  render() {
    const { onClick, items } = this.props;

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

    const observer = lozad();
    observer.observe();
    
    const content = (items || []).map((product, index) => {
      return (
        <div
          key={index}
          className="brand-p-item mb-20 sm:mb-10"
          onClick={onClick && onClick.bind(this, product)}
        >
          <div className="font-medium text-black text-xl mb-4 title sm">
            <div dangerouslySetInnerHTML={{ __html: product.name }} />
          </div>
          <div className="image-wrapper">
            {product.acf.length !== 0 && product.acf.bg_image ? (
              <img className="lozad" data-src={product.acf.bg_image} />
            ) : (
              <div className="no-product h-full flex items-center justify-center">
                <div className="icon-wrapper rounded-full h-24 w-24 flex items-center justify-center">
                  <PictureOutlined />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    });

    if ((items || []).length > 8) {
      return <Slider {...settingsProductItems}>{content}</Slider>;
    }

    return <div className="grid grid-cols-4 gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">{content}</div>;
  }
}

export default Products;
