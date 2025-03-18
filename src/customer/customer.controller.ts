import { Controller, Get, UseGuards, Query, Request, Post, Body, Put, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { BasePaginationDto, ProductsPaginationDto } from 'src/dto/create-common.dto';
import { CreateOrderDto } from './dto/create-customer.dto';


@ApiBearerAuth('Authorization')
@ApiTags('Customer')
@UseGuards(AuthGuard)
@Roles('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Get('stores')
  findAllStores(@Request() req, @Query() paginationDto: BasePaginationDto,) {
    return this.customerService.findAllStores(paginationDto, req.user.id);
  }

  @Get('products')
  findAllProducts(@Request() req, @Query() paginationDto: ProductsPaginationDto,) {
    return this.customerService.findAllProducts(paginationDto, req.user.id);
  }

  @Get('orders')
  findAllOrders(@Request() req, @Query() paginationDto: BasePaginationDto,) {
    return this.customerService.findAllOrders(paginationDto, req.user.id);
  }

  @Post('place-order')
  async placeOrder(@Request() req, @Body() dto: CreateOrderDto) {
    return this.customerService.placeOrder(dto, req.user.id,);
  }

  @Put('updateOrder/:id')
  updateOrder(@Param('id') id: number, @Request() req,) {
    return this.customerService.updateOrder(+id, req.user.id);
  }

}
