import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { CreateProfileDto } from './dtos/create-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }

  // @Get('student-profile')
  // @UseGuards(JwtGuard)
  // async profile(@Req() req: Request) {
  //   return this.authService.
  // }

  @Post('profile')
  @UseGuards(JwtGuard)
  async createProfile(
    @Req() req: Request,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.authService.createProfile(req.user['id'], createProfileDto);
  }
}
