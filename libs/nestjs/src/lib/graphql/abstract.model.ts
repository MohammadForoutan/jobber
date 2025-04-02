import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class AbstractModel {
  @Field(() => ID)
  declare id: number;
}
