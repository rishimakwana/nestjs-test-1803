import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request, Put  } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { BasePaginationDto } from 'src/dto/create-common.dto';

@ApiBearerAuth('Authorization')
@ApiTags('Store')
@UseGuards(AuthGuard)
@Roles('admin')
@Controller('admin/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  create(@Request() req, @Body() createStoreDto: CreateStoreDto) {    
    return this.storeService.create(createStoreDto,req.user.id);
  }

  @Get('list')
  getStoresList(@Request() req) {  
    return this.storeService.getAllList(req.user.id);
  }

  @Get()
  findAll(@Request() req, @Query() paginationDto: BasePaginationDto,) {
    return this.storeService.findAll(paginationDto,req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.storeService.findOne(+id,req.user.id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto,req.user.id);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.storeService.remove(+id,req.user.id);
  }

  
}
