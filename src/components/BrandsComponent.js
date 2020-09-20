import React from "react";
import Slider from "react-slick";
import arrow from "../public/images/arrow.png";
import arrowImage from "../public/images/arrow.png";
import mainStore from "../stores";
import Link from "next/link";
import styled from "styled-components";
import { Nav, Dropdown } from "rsuite";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={arrow}
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={arrow}
      className={className}
      style={{ ...style, display: "block", transform: "rotate(180deg)" }}
      onClick={onClick}
    />
  );
}

const styles = {
  navlink:{ 
    display: "inline-block",
    marginRight: "25px",
    fontSize: 25,
    fontWeight: "bold"
  },
  nav : {
    marginBottom: 25
  }
};

const BrandsComponent = ({ data }) => {
  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
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

  const { language } = mainStore();
  const items = data[0].acf;
  // console.log(data[0].acf);

  const MyLink = React.forwardRef((props, ref) => {
    const { href, as, ...rest } = props;
    return (
      <Link href={href} as={as}>
        <a ref={ref} {...rest} />
      </Link>
    );
  });

  const NavLink = (props) => <Nav.Item componentClass={MyLink} {...props} />;
  const instance = (
    <Nav style={styles.nav}>
      <NavLink style={styles.navlink} href="/brands?lang=en">
        #all brands
      </NavLink>
      <NavLink style={styles.navlink} href="/guide/introduction">
        #cable
      </NavLink>
      <NavLink style={styles.navlink} href="/components/overview">
        #connectors
      </NavLink>
    </Nav>
  );

  const renderBrands = items.brands.map((brand, index) => {
    return (
      <div key={index}>
        <div style={{height: 50}}>
          <img
            src={brand.brand_image.url}
            className="object-contain h-full"
            alt={brand.brand_image.alt}
          />
        </div>
        <Link
          // href={{
          //   pathname: `${data[0].slug}/${brand.slug}`,
          //   query: { lang: language },
          // }}
          href={`${data[0].slug}/${brand.slug}`}
          as={`/brands/${brand.slug}?lang=${language}`}
        >
          <a className="my-8 text-lg w-auto bg-transparent text-black text-opacity-50 lowercase hover:text-opacity-100 hover:text-black flex flex-row sm:my-4">
            read more
            <img className="object-contain ml-4" src={arrowImage} />
          </a>
        </Link>
        <div style={{width: 300, height: 250}}>
          <img
            src={brand.brand_thumbnail.url}
            className="object-cover h-full"
            alt={brand.brand_thumbnail.alt}
          />
        </div>
      </div>
    );
  });
  return (
    <div className="justify-start items-start brands sm:ml-10 sm:mr-4" style={{backgroundColor: "white"}}>
      <div>{instance}</div>
      <Slider {...settings} className="h-full">
        {renderBrands}
      </Slider>
    </div>
  );
};

export default BrandsComponent;
