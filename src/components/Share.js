import React from "react";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Share extends React.Component {
  render() {
    const { path, title = "" } = this.props;

    return (
      <div className="share-container flex mt-20">
        <a
          href="https://www.facebook.com/mmsengineer"
          className="facebook social mr-20"
        >
          <FontAwesomeIcon icon={faFacebook} size="1x" />
        </a>
        <a
          href="https://www.facebook.com/mmsengineer"
          className="twitter social mr-20"
        >
          <FontAwesomeIcon icon={faTwitter} size="1x" />
        </a>
        <a
          href="https://www.facebook.com/mmsengineer"
          className="instagram social mr-20"
        >
          <FontAwesomeIcon icon={faInstagram} size="1x" />
        </a>
        <a
          href="https://www.facebook.com/mmsengineer"
          className="linkedin social mr-20"
        >
          <FontAwesomeIcon icon={faLinkedinIn} size="1x" />
        </a>
      </div>
    );
  }
}

export default Share;
