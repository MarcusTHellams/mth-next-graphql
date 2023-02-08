import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import { createUser, getUsers } from './user/user.type';

export const schemaType = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => {
      return {
        helloWorld: {
          type: GraphQLString,
          name: 'helloWorld',
          description: 'Greetings to the World',
          resolve: () => {
            return 'Hello World';
          },
        },
        ...getUsers,
      };
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => {
      return {
        ...createUser,
      };
    },
  }),
});
