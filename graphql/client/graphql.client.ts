import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient(
  `${process.env.RENDER_EXTERNAL_URL}/api/graphql`
);
