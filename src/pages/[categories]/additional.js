import React from "react";
import axios from "axios";
import { Config } from "../../config";

class Additional extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    const { currentItemId, lang } = this.props;

    axios
      .get(
        `${Config.apiUrl}/wp/v2/posts?_embed&include[]=${
          currentItemId || 1054
        }&${lang === "mn" ? "lang=mn" : "lang="}`
      )
      .then((res) =>
        this.setState({
          post: res.data[0],
        })
      )
      .catch((err) => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    axios
      .get(
        `${Config.apiUrl}/wp/v2/posts?_embed&include[]=${
          nextProps.currentItemId || 1054
        }&${this.props.lang === "mn" ? "lang=mn" : "lang="}`
      )
      .then((res) =>
        this.setState({
          post: res.data[0],
        })
      )
      .catch((err) => console.log(err));
  }

  renderSupport(acf) {
    const { supports } = acf || {};
    const datas = supports && supports.desc.split("<li>");
    const noFilter =
      supports &&
      supports.title === "Professional material supply" &&
      "noFilter";

    return (
      <div className="support">
        <h2 className="text-2xl capitalize font-bold text-menuTextColor mb-12">
          {supports && (
            <div dangerouslySetInnerHTML={{ __html: supports.title }} />
          )}
        </h2>
        <div className="support-content grid gap-6 grid-cols-4">
          {(datas || []).map((data, index) => {
            if (
              data.includes("<ul") ||
              data.includes("<p><!-- /wp:list --></p>")
            ) {
              return null;
            }

            return (
              <div
                className={`icon-wrapper bg-white flex justify-center rounded-md mb-4 ${noFilter}`}
                key={index}
              >
                <div
                  className="flex flex-col items-center text-base text-center font-medium px-6 leading-5"
                  dangerouslySetInnerHTML={{ __html: data }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  renderContent(group, index) {
    return (
      <div
        data-aos="fade-down"
        data-aos-easing="ease"
        data-aos-delay={`${index * 100}`}
        data-aos-duration="2000"
        data-aos-offset="300"
        className="h-full mx-12 mt-20 content text-base relative"
      >
        <img
          className="absolute"
          src={`images/industry${index}.png`}
          alt="icon-i"
        />
        <div
          dangerouslySetInnerHTML={{
            __html: group,
          }}
        />
      </div>
    );
  }

  render() {
    const { post = {} } = this.state;
    const { additional } = post.acf || {};

    return (
      <div className="category-item h-full">
        <div className="grid grid-cols-3 h-full">
          <div className="odd">
            {additional && this.renderContent(additional.group, 1)}
          </div>
          <div className="">
            {additional && this.renderContent(additional.group_1, 2)}
          </div>
          <div className="odd">
            {additional && this.renderContent(additional.group_2, 3)}
          </div>
        </div>
      </div>
    );
  }
}

export default Additional;