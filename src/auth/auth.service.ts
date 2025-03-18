import { ConflictException, ForbiddenException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, CommonUserDto } from './dto/create-auth.dto';
import { handleSequelizeError } from 'src/helper/error-handler';
import { User } from 'src/models/user.entity';
import { generateToken } from 'src/helper/common_functions';
import globalMsg from 'src/globalMsg';
import { UserRoles } from 'src/models/userRoles.entity';
import { ConfigService } from '@nestjs/config';
import { RoleMst } from 'src/models/roleMst.entity';
import { sequelize } from 'src/database/database.config';

@Injectable()
export class AuthService {

  constructor(private configService: ConfigService) { }

  async register(userDto: CreateUserDto) {
    const t = await sequelize.transaction();
    try {
      const existingUser = await User.findOne({ where: { email: userDto.email } });
      if (existingUser) {
        throw new ConflictException('User already registered with this email');
      }

      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const user = await User.create({
        ...userDto,
        // name:userDto.fullName,
        password: hashedPassword,
      }, { transaction: t });

      await UserRoles.create({ roleId: 2, userId: user.id }, { transaction: t });

      delete user.dataValues.password;

      await t.commit();
      return {
        statusCode: HttpStatus.OK,
        message: globalMsg.auth.REGISTERED_SUCCESSFULLY,
        data: {
          user,
        }
      };
    } catch (error) {
      await t.rollback();
      handleSequelizeError(error);
    }
  }
  async login(userDto: CommonUserDto, isAdmin = false) {
    try {

      const role = await RoleMst.findOne({ where: { name: isAdmin ? 'admin' : 'customer' } });

      let user = await User.findOne({
        where: { email: userDto.email },
        include: [
          {
            model: UserRoles,
            attributes: ['roleId'],
          }
        ]
      });

      if (!user) {
        throw new NotFoundException(globalMsg.errors.USER_NOT_FOUND);
      }

      user = user.toJSON();
      if (user.userRoles?.roleId !== role.id) {
        throw new ForbiddenException(`User is not authorized as ${isAdmin ? 'admin' : 'customer'}`);
      }

      const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = generateToken(user.id, user.userRoles.roleId, this.configService);

      return {
        statusCode: HttpStatus.OK,
        message: globalMsg.auth.LOGGED_IN_SUCCESSFUL,
        data: {
          user,
          token,
          isAdmin: isAdmin ? 'admin' : 'customer'
        }
      };
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  async getProfile(id: any) {
    try {

      const findUser = await User.findByPk(id, {
        include: [
          {
            model: UserRoles,
            include: [
              {
                model: RoleMst,
                attributes: ['name'],
              },
            ], attributes: ['roleId'],
          }
        ], attributes: {
          exclude: ['password']
        }
      },
      );

      if (!findUser) {
        throw new NotFoundException(globalMsg.errors.USER_NOT_FOUND);
      }

      return {
        statusCode: HttpStatus.OK,
        message: globalMsg.common.FETCH_DATA_SUCCESSFULLY,
        data: findUser
      };
    } catch (error) {
      handleSequelizeError(error)
    }
  }
}
