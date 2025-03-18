import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { BasePaginationDto } from 'src/dto/create-common.dto';

@ApiBearerAuth('Authorization')
@ApiTags('Product')
@UseGuards(AuthGuard)
@Roles('admin')
@Controller('admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  createProduct(@Body() dto: CreateProductDto, @Request() req) {
    return this.productService.createProduct(dto, req.user.id);
  }

  @Get()
  findAll(@Request() req, @Query() paginationDto: BasePaginationDto) {
    return this.productService.findAll(paginationDto, req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.productService.findOne(+id, req.user.id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto, req.user.id);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.productService.remove(+id, req.user.id);
  }
}
