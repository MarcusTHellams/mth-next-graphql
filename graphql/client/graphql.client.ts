import { GraphQLClient } from 'graphql-request';


export const graphqlClient = new GraphQLClient(`${process.env.API_HOST || ''}/api/graphql`);
