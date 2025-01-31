import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Users, UsersSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
})
export class UserModule {}
