import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import AppRequest from '../types/AppRequest';

const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request: AppRequest = ctx.switchToHttp().getRequest();
  const user = request.user;

  return data ? user?.[data] : user;
});

export default User;
