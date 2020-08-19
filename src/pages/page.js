import WPAPI from 'wpapi';
import React from 'react';
import {Config} from "../config";
import Layout from "../components/layouts/Layout";
import { getData } from "../utils";

const wp = new WPAPI({ endpoint: Config.apiUrl });

export default class extends React.Component {
  static async getInitialProps(context) {
    const slug = context.query.slug;

    const page = await wp
      .pages()
      .slug(slug)
      .embed()
      .then(data => {
        return data[0];
      });

    return { page };
  }

  render() {
    const { page } = this.props;

    return (
      <Layout>
        <div className="row">
          <h2>{page.title}</h2>
          Here is page
          <img src={getData(page._embedded, 'image')} />
        </div>
      </Layout>
    );
  }
}