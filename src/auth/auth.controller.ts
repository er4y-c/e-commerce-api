import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { Request } from 'express';

import { Public } from 'src/common/decorators';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up with new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: RegisterUserDto })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() registerDto: RegisterUserDto) {
    return this.authService.signUp(registerDto);
  }

  @ApiOperation({ summary: 'Sign in with user' })
  @ApiResponse({ status: 200, description: 'User signed in successfully' })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: LoginUserDto })
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
