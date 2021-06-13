import React from "react";
import ReactFullpage from "../lib/fullpage";

export default class FullPage extends React.Component {
  onAnimation = (type) => {
    const animateElement = document.getElementsByClassName("aos-init");

    var i;
    for (i = 0; i < animateElement.length; i++) {
      type === "leave"
        ? animateElement[i].classList.remove("aos-animate")
        : animateElement[i].classList.add("aos-animate");
    }
  };

  onLeave = (origin, destination, direction) => {
    this.onAnimation("leave");
  };

  afterLoad = (origin, destination, direction) => {
    this.onAnimation("afterLoad");
  };

  render() {
    const { children } = this.props;
    const anchors = Array.from(
      { length: 10 },
      (_, index) => `section${index + 1}`
    );
    console.log("heree");
    return (
      <ReactFullpage
        anchors={anchors}
        navigationPosition={"left"}
        navigation
        parallax={true}
        onLeave={this.onLeave.bind(this)}
        afterLoad={this.afterLoad.bind(this)}
        scrollOverflow={true}
        responsiveHeight={600}
        render={() => children}
      />
    );
  }
}
