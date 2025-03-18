import { Sequelize } from 'sequelize';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import globalMsg from 'src/globalMsg';
import { Order } from 'src/models/order.entity';
import { Store } from 'src/models/store.entity';
import { Product } from 'src/models/product.entity';
import { sequelize } from 'src/database/database.config';
import { CreateOrderDto } from './dto/create-customer.dto';
import { handleSequelizeError } from 'src/helper/error-handler';
import { findEntitiesWithPaginationAndSearch } from 'src/helper/common_functions';

@Injectable()
export class CustomerService {

  async findAllStores(paginationDto, id) {
    const result = await findEntitiesWithPaginationAndSearch(Store, paginationDto, {},);
    return result;
  }

  async findAllProducts(paginationDto, id) {
    const result = await findEntitiesWithPaginationAndSearch(Product, paginationDto, {}, 'AllProductsModule');
    return result;
  }

  async findAllOrders(paginationDto, id) {
    const result = await findEntitiesWithPaginationAndSearch(Order, paginationDto, {}, 'GetAllOrdersModule', id);
    return result;
  }

  async placeOrder(dto: CreateOrderDto, userId) {
    const t = await sequelize.transaction();
    try {
      const { productId, name } = dto;
      const product = await Product.findByPk(productId);
      if (!product) throw new BadRequestException('Product not found');

      if (product.dataValues.stock <= 0) {
        throw new BadRequestException('Product out of stock');
      }

      // Create Order
      const order = await Order.create({
        userId,
        productId,
        name,
        quantity: 1,
        status: 'completed',
        storeId: product.dataValues.storeId,
      }, { transaction: t });

      const updatedStock = product.dataValues.stock - 1

      await product.update({ stock: updatedStock }, { transaction: t });

      await t.commit();
      return {
        message: 'Order placed successfully',
        order,
      };
    } catch (error) {
      await t.rollback();
      handleSequelizeError(error);
    }
  }

  async updateOrder(id: number, userId) {
    const t = await sequelize.transaction();
    try {
      let order = await Order.findByPk(id);
      if (!order) {
        throw new BadRequestException(globalMsg.errors.ORDER_NOT_FOUND);
      }

      if (order.dataValues.status === 'return') {
        throw new BadRequestException('Order already returned');
      }

      await order.update({ status: 'return' }, { transaction: t });
      await Product.update(
        { stock: Sequelize.literal('stock + 1') },
        { where: { id: order.dataValues.productId }, transaction: t }
      );

      await t.commit();
      return {
        statusCode: HttpStatus.OK,
        message: globalMsg.common.ORDER_RETURNED_SUCCESSFULLY,
        result: order,
      };
    } catch (error) {
      await t.rollback();
      handleSequelizeError(error);
    }
  }
}
