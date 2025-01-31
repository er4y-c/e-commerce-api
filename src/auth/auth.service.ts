import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import config from 'src/common/config';
import { Users, UsersDocument } from 'src/modules/user/user.schema';
import { User } from 'src/modules/user/entities/user.entity';
import { RegisterUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
  ) {
    this.supabase = createClient(
      config().supabase_url as string,
      config().supabase_key as string,
    );
  }

  async signUp(registerDto: RegisterUserDto) {
    const { data: authData, error } = await this.supabase.auth.signUp({
      email: registerDto.email,
      password: registerDto.password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const user = new this.userModel({
      email: registerDto.email,
      supabaseUid: authData?.user?.id,
      role: registerDto.role,
      name: registerDto.name,
      surname: registerDto.surname,
      phone: registerDto.phone,
    });

    await user.save();

    return {
      message: 'Check your email for verification link',
      user: {
        email: user.email,
        id: user._id,
      },
    };
  }

  async signIn(authDto: LoginUserDto) {
    const { data: authData, error } =
      await this.supabase.auth.signInWithPassword({
        email: authDto.email,
        password: authDto.password,
      });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const user = await this.userModel.findOne({
      supabaseUid: authData.user.id,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      accessToken: authData.session.access_token,
    };
  }

  async verifyToken(token: string) {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser(token);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const currentUser = await this.userModel.findOne({ supabaseUid: user?.id });
    if (!currentUser) {
      throw new UnauthorizedException('User not found');
    }

    const userEntity = new User(
      currentUser._id.toString(),
      currentUser.name,
      currentUser.surname,
      currentUser.phone,
      currentUser.email,
      currentUser.supabaseUid,
      currentUser.createdAt,
      currentUser.role,
      currentUser.userAddress,
      currentUser.billingAddress,
    );
    return userEntity;
  }
}
