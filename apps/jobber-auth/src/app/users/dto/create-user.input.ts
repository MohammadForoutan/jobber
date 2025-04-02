import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsDefined()
  @IsString()
  name: string;

  @Field()
  @IsDefined()
  @IsString()
  @IsStrongPassword()
  password: string;
}
