import React, { useContext, useEffect, useState } from "react";
import logo from "../../public/images/mms-logo.png";
import burger from "../../public/images/burger.png";
import Link from "next/link";
import DataContext from "../DataContext";
import { Drawer } from "antd";
import mainStore from "../../stores";
import { useRouter } from "next/router";

const MenuComponent = () => {
  const router = useRouter();
  let menu = useContext(DataContext);

  const { language, setLanguage } = mainStore();
  const [visible, setVisible] = useState(false);
  const lang = router.query.lang;

  useEffect(() => {
    setLanguage(lang);
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const pathChecker = (item) => {
    if (item.slug === "capabilities") {
      return "/[categories]";
    } else if (item.slug === "industries") {
      return "/[categories]";
    } else if (item.slug === "portfolio") {
      return "/portfolio";
    } else if (item.slug === "brands") {
      return "/brands";
    } else return `/${item.slug}`;
  };

  return (
    <div>
      <nav
        className={
          "main-header flex flex-row justify-between p-2 w-full absolute top-0 left-0 right-0 border-b-2 z-50"
        }
      >
        <a href={`/?lang=${language}`} className={"logo my-auto sm:w-12"}>
          <img className="w-24" src={logo} alt={"logo"} />
        </a>
        <div className={"menus flex flex-col  justify-around"}>
          <div className={"topMenu sm:hidden self-end flex flex-row"}>
            <div
              className={"topMenuList text-menuTextColor font-light text-sm "}
            >
              {!menu ? (
                <div>Loading</div>
              ) : (
                menu.top_menu.items.map((item, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: pathChecker(item),
                      query: { lang: language },
                    }}
                    as={`/${item.slug}?lang=${language}`}
                  >
                    <a className={"px-4 border-r border-menuTextColor"}>
                      {item.title}
                    </a>
                  </Link>
                ))
              )}
            </div>
            <div className={"topMenuLanguage mr-4"}>
              <a
                href="?lang="
                className={`mr-1 ${
                  language === "en" ? "font-bold text-menuTextColor" : ""
                }`}
              >
                EN
              </a>
              <span>/</span>
              <a
                href="?lang=mn"
                className={`ml-1 ${
                  language === "mn" ? "font-bold text-menuTextColor" : ""
                }`}
              >
                MN
              </a>
            </div>
          </div>
          <div
            className={
              "bottomMenu  text-menuTextColor flex flex-row md:justify-end"
            }
          >
            <div
              className={
                "bottomMenuList sm:hidden md:hidden md:justify-end  text-base font-extrabold border-r border-blue-700"
              }
            >
              {!menu ? (
                <div>Loading</div>
              ) : (
                menu.bottom_menu.items.map((item, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: pathChecker(item),
                      query: { lang: language },
                    }}
                    as={`/${item.slug}?lang=${language}`}
                  >
                    <a className={"mx-4 "}>{item.title}</a>
                  </Link>
                ))
              )}
            </div>
            <div className={"bottomMenuSearchMenu flex flex-row  "}>
              <a className={"mx-4"}>
                <i className="fas fa-search" aria-hidden="true" />
              </a>
              <a onClick={showDrawer} className={"mx-4 my-auto"}>
                <img src={burger} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          backgroundColor: "#00488D",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        width={360}
      >
        <div className="drawerMenu self-center">
          <div className="drawerLang my-4">
            <Link href={{ query: { lang: "en" } }}>
              <a
                onClick={() => setLanguage("en")}
                className={`mx-4 ${language === "en" ? "font-bold" : ""}`}
              >
                English
              </a>
            </Link>
            <span> - </span>
            <Link href={{ query: { lang: "mn" } }}>
              <a
                onClick={() => setLanguage("mn")}
                className={`mx-4 ${language === "mn" ? "font-bold" : ""}`}
              >
                Монгол
              </a>
            </Link>
          </div>

          {!menu ? (
            <div>Loading</div>
          ) : (
            menu.bottom_menu.items.map((item, index) => (
              <div key={index} className="flex flex-col">
                <a
                  href={`/${item.slug}?lang=${language}`}
                  className={"mx-4 font-bold"}
                >
                  {item.title}
                </a>
                <div className="flex flex-col mb-6">
                  {item.child_items?.map((children, index) => (
                    <a
                      key={index}
                      href={`/${item.slug}/${children.slug}?lang=${language}`}
                      className={"mx-4"}
                    >
                      {children.title}
                    </a>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawerSubMenu justify-between mb-10">
          {!menu ? (
            <div>Loading</div>
          ) : (
            menu.top_menu.items.map((item, index) => (
              <a
                key={index}
                href={`/${item.slug}?lang=${language}`}
                className={"px-4 font-bold border-r border-white"}
              >
                {item.title}
              </a>
            ))
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default MenuComponent;
