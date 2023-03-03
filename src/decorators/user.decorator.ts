import { UserDocument } from 'src/users/schemas/user.schema';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx
      .switchToHttp()
      .getRequest<Request & { user: UserDocument }>();
    console.log();
    return req.user;
  },
);