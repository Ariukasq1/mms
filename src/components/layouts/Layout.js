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
          <Menu data={navMenu}/>
          {children}
        </main>
        <Footer />
      </>
    );
  }
}

export default Layout;
