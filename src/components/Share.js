import React from "react";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";


const Logo = styled.a`
  margin-left: 20px;
`;
class Share extends React.Component {

  
  render() {
    const { path, title = "" } = this.props;

    return (
      <div className="share-container" style={{ marginTop: 10 }}>
        <Logo
          href="https://www.facebook.com/mmsengineer"
          className="facebook social"
        >
          <FontAwesomeIcon icon={faFacebook} size="1x" />
        </Logo>
        <Logo
          href="https://www.facebook.com/mmsengineer"
          className="twitter social"
        >
          <FontAwesomeIcon icon={faTwitter} size="1x" />
        </Logo>
        <Logo
          href="https://www.facebook.com/mmsengineer"
          className="instagram social"
        >
          <FontAwesomeIcon icon={faInstagram} size="1x" />
        </Logo>
        <Logo
          href="https://www.facebook.com/mmsengineer"
          className="linkedin social"
        >
          <FontAwesomeIcon icon={faLinkedinIn} size="1x" />
        </Logo>
      </div>
    );
  }
}



export default Share;
