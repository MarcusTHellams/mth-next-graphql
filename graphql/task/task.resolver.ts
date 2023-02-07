import { Ctx, Query, Resolver } from 'type-graphql';

import { type IContext } from '../../types';
import { TaskType } from './task.type';

@Resolver(()=> TaskType)
export class TaskResolver {
  @Query(() => [TaskType], { nullable: true })
  async tasks(@Ctx() { prisma }: IContext) {
    const tasks = await prisma.task.findMany();
    return tasks;
  }
}
