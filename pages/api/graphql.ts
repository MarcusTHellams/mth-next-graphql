import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { buildSchemaSync } from 'type-graphql';

import { UserResolver } from '../../graphql/user/user.resolver';
import { IContext } from './../../types';
import { prisma } from './../../utils';


export const schema = buildSchemaSync({
  resolvers: [UserResolver],
});

const server = new ApolloServer<IContext>({
  schema,
});

export default startServerAndCreateNextHandler<IContext>(server, {
  context: async (req, res) => {
    return {
      prisma,
      req,
      res,
    };
  },
});
