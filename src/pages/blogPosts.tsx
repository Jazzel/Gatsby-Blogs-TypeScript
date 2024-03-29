import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ContentfulRichText from '../components/contentfulRichText';
import { BlogPagesQueryQuery } from '../../types/graphql-types'; // eslint-disable-line import/no-unresolved
import { any } from 'prop-types';

type Props = {
  data: BlogPagesQueryQuery;
};

const BlogPosts: React.FC<Props> = ({ data }: Props) => {
  const documents = data.allContentfulBlogPost.edges
    .filter((edge: any) => edge.node.description)
    .map((edge: any) => {
      const { id, title, description } = edge.node;
      return { id, title, description };
    });
  return (
    <Layout>
      <SEO title="Blog Posts" />
      <h1>Blog Posts (source: Contentful)</h1>
      {documents.map((node: any) => {
        return (
          <div key={node.id}>
            <h2 key={`${node.id}-title`}>{node.title}</h2>
            {console.log(node.description, node)}
            <p>{node.description.description}</p>
          </div>
        );
      })}
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
};

export const query = graphql`
  query BlogPagesQuery {
    allContentfulBlogPost(limit: 10) {
      edges {
        node {
          id
          title
          updatedAt
          description {
            description
          }
        }
      }
    }
  }
`;

export default BlogPosts;
