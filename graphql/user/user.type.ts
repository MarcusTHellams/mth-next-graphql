import { Field, ObjectType } from 'type-graphql';

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
