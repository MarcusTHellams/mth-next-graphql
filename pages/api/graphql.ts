import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

// import { buildSchemaSync } from 'type-graphql';
import { schemaType } from '../../graphql/schema';
import { UserResolver } from '../../graphql/user/user.resolver';
import { IContext } from './../../types';
import { prisma } from './../../utils';

// export const schema = buildSchemaSync({
//   resolvers: [UserResolver],
// });

const server = new ApolloServer<IContext>({
  schema: schemaType,
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
