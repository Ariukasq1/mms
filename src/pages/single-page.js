import React from 'react';
import {Config} from "../config";
import WPAPI from 'wpapi';
import Error from 'next/error';
import Layout from "../components/layouts/Layout";
import { getData } from "../utils";

const wp = new WPAPI({ endpoint: Config.apiUrl });

export default class extends React.Component {
  static async getInitialProps(context) {
    const slug = context.query.slug;
    let apiMethod = wp.posts();

    const post = await apiMethod
      .slug(slug)
      .embed()
      .then(data => {
        return data[0];
      });

    return { post };
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <Error statusCode={404} />
    }

    return (
      <Layout>
        <PageHeader
          className="slider page"
          title={post.title.rendered}
          img={headerImage ? headerImage : getData(post._embedded, 'image')}
          breadcrumb={breadcrumb}
          url={post.slug}
        />
        <div className="row my-50">
          <h2>{post.title.rendered}</h2>
          <img src={getData(post._embedded, 'image')} />
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      </Layout >
    );
  }
}
