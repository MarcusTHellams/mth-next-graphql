import { GraphQLClient } from 'graphql-request';

console.log(process.env);

export const graphqlClient = new GraphQLClient(`${process.env.API_HOST || ''}/api/graphql`);
