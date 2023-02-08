import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
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

export const Role = new GraphQLObjectType({
  name: 'RoleType',
  description: 'Role',
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      description: {
        type: new GraphQLNonNull(GraphQLString),
      },
    };
  },
});
