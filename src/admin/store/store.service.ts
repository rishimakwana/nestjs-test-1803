import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from 'src/models/store.entity';
import { findEntitiesWithPaginationAndSearch } from 'src/helper/common_functions';

@Injectable()
export class StoreService {
  async create(createStoreDto: CreateStoreDto, userId: number) {
    const store = await Store.findOne({ where: { name: createStoreDto.name } });

    if (store) {
      throw new NotFoundException(`Store already exits with name: ${createStoreDto.name}`);
    }
    return await Store.create({ ...createStoreDto, userId });
  }

  async findAll(paginationDto, userId: number) {
    const result = await findEntitiesWithPaginationAndSearch(Store, paginationDto, {}, 'AdminStoreModule', userId);
    return result;
  }

  async getAllList(userId: number) {
    const rows = await Store.findAll({
      where: { userId }
    });

    return rows;
  }

  async findOne(id: number, userId: number) {
    const store = await Store.findOne({ where: { id, userId } });

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto, userId: number) {
    const store = await Store.findOne({ where: { id, userId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    await store.update({ name: updateStoreDto.name });
    return store;
  }

  async remove(id: number, userId: number) {
    const store = await Store.findOne({ where: { id, userId } });

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    await store.destroy();
    return { message: `Store with ID ${id} deleted successfully` };
  }
}
