import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TaskType {
  @Field(() => String, { name: 'id' })
  id!: string;

  @Field(() => String, { name: 'title' })
  title!: string;

  @Field(() => String, { name: 'description', nullable: true })
  description?: string;

  @Field(() => String, { name: 'ownerId' })
  ownerId!: string;
}
