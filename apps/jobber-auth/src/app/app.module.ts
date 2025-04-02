import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // We need to pass the request and response objects to the Apollo server
      // so that it can use them to validate the JWT token and attach the user
      // to the context. This is necessary because the Apollo server does not
      // have access to the request and response objects by default.
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
