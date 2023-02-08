import { type User as USER, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Field, ObjectType } from 'type-graphql';

import { Role } from '../role/role.type';
import { IContext } from './../../types/index';

@ObjectType()
export class UserType {
  @Field(() => String, { name: 'id' })
  id!: string;

  @Field(() => String, { name: 'firstName' })
  firstName!: string;

  @Field(() => String, { name: 'lastName' })
  lastName!: string;

  @Field(() => String, { name: 'username' })
  username!: string;

  @Field(() => String, { name: 'email' })
  email!: string;
}

export const User = new GraphQLObjectType({
  name: 'UserType',
  description: 'User',
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      roles: {
        type: new GraphQLList(Role),
        async resolve(source: USER, args: unknown, { prisma }: IContext) {
          const user = await prisma.user.findFirst({
            where: { id: source.id },
            select: {
              roles: true,
            },
          });
          return user?.roles;
        },
      },
    };
  },
});

export const createUserInput = new GraphQLInputObjectType({
  name: 'createUserInput',
  description: 'Create User Input',
  fields: () => {
    return {
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    };
  },
});

export const getUsers = {
  users: {
    type: new GraphQLList(User),
    name: 'getUsers',
    description: 'Get Users',
    resolve: async (a: unknown, b: unknown, { prisma }: IContext) => {
      const users = await prisma.user.findMany();
      return users;
    },
  },
};

export const createUser = {
  createUser: {
    type: User,
    name: 'createUser',
    description: 'Create User',
    args: {
      createUserInput: {
        type: createUserInput,
        nullable: false,
      },
    },
    resolve: async (source: unknown, args: unknown, { prisma }: IContext) => {
      const { createUserInput } = args as {
        createUserInput: Prisma.UserCreateInput;
      };
      const hashedPassword = bcrypt.hashSync(createUserInput.password, 10);
      const user = await prisma.user.create({
        data: {
          ...createUserInput,
          password: hashedPassword,
        },
      });
      return user;
    },
  },
};
