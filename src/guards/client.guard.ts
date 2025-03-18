import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { getUserByToken } from 'src/helper/common_functions';
import globalMsg from 'src/globalMsg';

@Injectable()
export class ClientGuard implements CanActivate {

  constructor(
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = this.extractTokenFromHeader(request);
    let isParams = false

    if (request?.params?.token) {
      token = request.params.token
      isParams = true
    }

    if (!token) {
      throw new UnauthorizedException('Token is required for authorization');
    }

    try {

      // const payload: any = await verify(token, this.configService.get('common.jwt'));

      // if (!payload) {
      //   throw new UnauthorizedException('Invalid token payload');
      // }

      // const user: any = await getUserByToken(payload.userId, payload.roleId,isParams)
      // if (!user.data) {
      //   throw new NotFoundException(globalMsg.errors.USER_NOT_FOUND);
      // }

      // request.user = user?.data;
      return true;
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      throw err;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
