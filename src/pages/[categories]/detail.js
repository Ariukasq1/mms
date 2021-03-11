import React from "react";
import axios from "axios";
import { Config } from "../../config";
import { getData } from "../../utils";

class ItemDetail extends React.Component {
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

    return (
      <div className="support">
        <h2 className="text-3xl capitalize font-bold text-menuTextColor mb-8">
          {supports && supports.title}
        </h2>
        <div className="support-content grid gap-6 grid-cols-4">
          {(datas || []).map((data, index) => {
            if (data.includes("<p><!-- wp:list --></p>")) {
              return null;
            }

            return (
              <div className="icon-wrapper mb-4" key={index}>
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

    return (
      <div className="category-item">
        <div className="pl-24 xl:pl-24 lg:pl-24 md:pl-24 sm:px-16">
          <div className="flex">
            <div className="w-1/2 flex flex-col justify-center flex-center mx-12">
              {this.renderSupport(post.acf)}
            </div>
            <div className="w-1/2">
              <div
                className="item-image bg-cover bg-no-repeat h-body object-cover object-center cursor-pointer relative"
                style={{
                  backgroundImage: `url(${getData(post._embedded, "image")})`,
                }}
              >
                <div className="inner-content">
                  <div className="inner-content-overlay absolute inset-0" />
                  <div className="inner-content-detail text-white absolute">
                    <h2 className="block text-3xl font-bold capitalize text-white mb-4">
                      {post.title && post.title.rendered}
                    </h2>
                    <div className="auto-overflow mb-4">
                      <div
                        className="text-lg font-medium"
                        dangerouslySetInnerHTML={{
                          __html: post.content && post.content.rendered,
                        }}
                      />
                    </div>
                    <div className="divider block bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
