import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// name of strategy
const jwt_strategy_name = 'jwt';
@Injectable()
export class GqlAuthGuard extends AuthGuard(jwt_strategy_name) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
