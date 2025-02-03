import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';


@Module({

  imports:[
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),], //se hace una referencia name: con la base de datos que deseo pasar a los services
  
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
