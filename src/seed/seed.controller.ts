
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Post('role')
  create() {
    return this.seedService.create();
  }

  @Post('creteAdmin')
  createAdmin() {
    return this.seedService.creteAdmin();
  }
}