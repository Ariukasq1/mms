import React from "react";

class Additional extends React.Component {
  renderContent(group, index) {
    return (
      <div
        data-aos="fade-down"
        data-aos-easing="ease"
        data-aos-delay={`${index * 100}`}
        data-aos-duration="2000"
        data-aos-offset="300"
        className="h-body w-full p-10 content text-base relative overflow-auto sm:h-auto lg:pl-16 xl:p-5 lg:pr-4 md:px-10 sm:pl-0 sm:pr-0 sm:pt-5 sm:px-8 md:h-auto lg:h-auto"
      >
        <img
          className="mb-2"
          src={`/images/industry${index}.png`}
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
    const { post = {} } = this.props;
    const { additional } = post.acf || {};

    return (
      <div className="category-item">
        <div className="grid grid-cols-3 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
          <div className="odd">
            {additional && this.renderContent(additional.group, 1)}
          </div>
          <div className="">
            {additional && this.renderContent(additional.group_1, 2)}
          </div>
          <div className="odd ">
            {additional && this.renderContent(additional.group_2, 3)}
          </div>
        </div>
      </div>
    );
  }
}

export default Additional;
