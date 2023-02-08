import { GraphQLClient } from 'graphql-request';

console.log(process.env.API_HOST);

export const graphqlClient = new GraphQLClient(`${process.env.API_HOST || ''}/api/graphql`);
