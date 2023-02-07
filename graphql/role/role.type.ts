import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RoleType {
  @Field(() => String, { name: 'id' })
  id!: string;

  @Field(() => String, { name: 'name' })
  name!: string;

  @Field(() => String, { name: 'description' })
  description?: string;
}
