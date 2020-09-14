import React from "react";
import Header from "./header";
import Footer from "./footer";
import Menu from "./menu";

class Layout extends React.Component {
  render() {
    const { children, title, image, navMenu } = this.props;
    return (
      <>
        <Header title={title} image={image} />
        <main className="relative">
          <Menu data={navMenu} />
          <div className={"border border-gray-200 h-full top-117 absolute ml-29"}></div>
          <div className={"border border-gray-200 h-full top-117 absolute ml-86"}></div>
          <div className={"border border-gray-200 h-full top-117 absolute ml-87"}></div>
          <div className={"border border-gray-200 h-full top-117 absolute ml-88"}></div>
          <div className={"border border-gray-200 h-full top-117 absolute ml-89"}></div>
          {children}
        </main>
      </>
    );
  }
}

export default Layout;
