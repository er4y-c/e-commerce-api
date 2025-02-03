import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const ReqUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    if (data) {
      const user = request.user;
      if (user && typeof user === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return user[data];
      }
      return undefined;
    }
    return request.user;
  },
);
