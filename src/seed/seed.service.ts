import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { rolesData } from 'src/data/dummyData';
import { handleSequelizeError } from 'src/helper/error-handler';
import { RoleMst } from 'src/models/roleMst.entity';
import { User } from 'src/models/user.entity';
import { UserRoles } from 'src/models/userRoles.entity';

@Injectable()
export class SeedService {

  async create() {
    try {
      const existingRoles = await RoleMst.findAll();
      if (existingRoles.length > 0) {
        return existingRoles;
      }
      const result = await RoleMst.bulkCreate(rolesData);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async creteAdmin() {
    try {
      const existingUser = await User.findOne({ where: { email: 'admin@mailinator.com' } });
      if (existingUser) {
        return existingUser;
      }
      const hashedPassword = await bcrypt.hash('admin@123', 10);
      const user = await User.create({
        name: 'Admin',
        email: 'admin@mailinator.com',
        password: hashedPassword,
      });
      await UserRoles.create({ roleId: 1, userId: user.id });
      return user;
    } catch (error) {
      handleSequelizeError(error);
    }
  }

}
