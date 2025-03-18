import { Request, Response } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { getUserByToken } from 'src/helper/common_functions';
import globalMsg from 'src/globalMsg';
import { handleAuthGuardError } from 'src/helper/error-handler';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get('common.jwt');

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();
    let token = this.extractTokenFromHeader(request);


    if (!token || token === 'undefined') {
      throw new UnauthorizedException('Token is required for authorization');
    }

    try {
      let user: any;
      const payload: any = await verify(token, this.jwtSecret);
      if (!payload) {
        throw new UnauthorizedException('Invalid JWT payload');
      }
      user = await getUserByToken(payload.userId, payload.roleId);

      if (!user?.data) {
        throw new NotFoundException(globalMsg.errors.USER_NOT_FOUND);
      }
      request.user = user.data;

      const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);

      if (requiredRoles && requiredRoles.length > 0) {
        if (!requiredRoles.includes(user?.data?.role)) {
          const rolesAllowed = requiredRoles.join(', ');
          throw new UnauthorizedException(
            `Access denied. Only ${rolesAllowed} can access this resource`,
          );
        }
      }

      return true;
    } catch (err) {
      handleAuthGuardError(err)
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
