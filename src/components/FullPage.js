import React from "react";
import ReactFullpage from "../lib/fullpage";

export default class FullPage extends React.Component {
  onAnimate = (type) => {
    const animateElement = document.getElementsByClassName("aos-init");

    var i;
    for (i = 0; i < animateElement.length; i++) {
      type === "leave"
        ? animateElement[i].classList.remove("aos-animate")
        : animateElement[i].classList.add("aos-animate");
    }
  };

  render() {
    const { children } = this.props;
    const anchors = Array.from(
      { length: 10 },
      (_, index) => `section${index + 1}`
    );

    return (
      <ReactFullpage
        anchors={anchors}
        navigationPosition={"left"}
        navigation
        paddingTop={"116px"}
        parallax={true}
        onLeave={this.onAnimate.bind(this, "leave")}
        afterLoad={this.onAnimate.bind(this, "load")}
        scrollOverflow={true}
        render={() => children}
      />
    );
  }
}
