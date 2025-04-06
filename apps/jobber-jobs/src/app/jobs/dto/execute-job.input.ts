import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ExecuteJobInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  name: string;
}
