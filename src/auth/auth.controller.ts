import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CommonUserDto, CreateUserDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiBearerAuth('Authorization')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() user: CommonUserDto) {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard)
  @Roles('admin', 'customer')
  @Get('getProfile')
  getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user?.id);
  }

  @Post('adminLogin')
  adminLogin(@Body() user: CommonUserDto) {
    return this.authService.login(user,true);
  }
}
