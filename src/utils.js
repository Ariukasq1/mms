import axios from "axios";
import arrow from "./public/images/arrow.svg";
import T from "i18n-react";

export const setLocale = (currentLanguage, callback) => {
  import(`./locales/${currentLanguage}.json`)
    .then((data) => {
      const translations = data.default;
      T.setTexts(translations);

      callback && callback();
    })
    .catch((e) => console.log(e)); // tslint:disable-line
};

export const getData = (object, type) => {
  switch (type) {
    case "categories":
      return object && object["wp:term"] && object["wp:term"][0]
        ? object["wp:term"][0]
        : [];
    case "tags":
      return object && object["wp:term"] && object["wp:term"][1]
        ? object["wp:term"][1]
        : [];
    case "author":
      return object && object["author"] && object["author"][0]
        ? object["author"][0]
        : null;
    case "image":
      return object &&
        object["wp:featuredmedia"] &&
        object["wp:featuredmedia"][0] &&
        object["wp:featuredmedia"][0].source_url
        ? object["wp:featuredmedia"][0].source_url
        : null;
    default:
      break;
  }
};

export const prefixer = (url) => {
  if (process.env.NODE_ENV !== "production") {
    return url;
  }

  return `/${url}`;
};

export const __ = (key, options) => {
  const translation = T.translate(key, options);

  if (!translation) {
    return "";
  }

  return translation.toString();
};

export const fetcher = (url) => {
  return axios
    .get(encodeURI(url))
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      src={arrow}
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      src={arrow}
      className={className}
      style={{ ...style, display: "block", transform: "rotate(180deg)" }}
      onClick={onClick}
    />
  );
};

export const getLangParam = () =>
  typeof window !== "undefined" && window.location.href.indexOf("=mn") > -1
    ? "mn"
    : "en";

export const sliderSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
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
