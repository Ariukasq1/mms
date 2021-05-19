import React from "react";
import axios from "axios";
import { Config } from "../../config";
import { getData } from "../../utils";

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

  render() {
    const { post = {} } = this.state;

    if (this.props.showDetail && Object.keys(post).length !== 0) {
      window.fullpage_api.moveTo(2, 0);
    }
    const { additional } = post.acf || {};

    return (
      <div className="category-item">
           <div className="pl-24 xl:pl-24 lg:pl-24 md:pl-24 sm:px-16">
             <div className="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4 w-full">
              <div className="w-4/5">
              {additional && 
                <div
                  dangerouslySetInnerHTML={{
                  __html: additional.group
                                }}
                />
              }
              </div>
              <div className="w-4/5">
              {additional && 
                <div
                  dangerouslySetInnerHTML={{
                  __html: additional.group_1
                                }}
                />
              }
              </div>
              <div className="w-4/5">
              {additional && 
                <div
                  dangerouslySetInnerHTML={{
                  __html: additional.group_2
                                }}
                />
              }
              </div>
           </div>
        </div>
      </div>
    );
  }
}

export default Additional;
