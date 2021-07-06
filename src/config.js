export const Config = {
  apiUrl: "http://www.source.mn//wp/wp-json",
  menuUrl: "http://www.source.mn//wp/wp-json/menus/v1/menus",
};

export const generateLink = (url) => {
  return `${url}?lang=${getLang()}`;
};

export const getLang = (context) => {
  let lang = getParam("lang") || "";

  if (typeof window === "undefined" && context) {
    lang = context.query.lang || "";
  }

  return lang;
};

export const getParam = (name) => {
  if (typeof window !== "undefined") {
    const parsed = queryString.parse(location.search);

    return parsed[name];
  }

  return null;
};
