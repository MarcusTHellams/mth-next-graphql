import { Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';

import { type IContext } from '../../types';
import { RoleType } from '../role/role.type';
import { TaskType } from '../task/task.type';
import { UserType } from './user.type';

@Resolver(() => UserType)
export class UserResolver {
  @Query(() => [UserType], { nullable: true })
  async users(@Ctx() { prisma }: IContext) {
    const users = await prisma.user.findMany();
    return users;
  }
  @FieldResolver(() => [TaskType])
  async tasks(@Root() parent: UserType, @Ctx() { prisma }: IContext) {
    const { tasks } = await prisma.user.findUniqueOrThrow({
      where: { id: parent.id },
      select: { tasks: true },
    });
    return tasks;
  }
  @FieldResolver(() => [RoleType])
  async roles(@Root() parent: UserType, @Ctx() { prisma }: IContext) {
    const roles = await prisma.role.findMany({
      where: {
        users: { every: { id: parent.id } },
      },
    });
    return roles;
  }
}
