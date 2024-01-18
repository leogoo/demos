import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IdCard } from 'src/entity/IdCard.entity';
import { Photo } from 'src/entity/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, IdCard, Photo])], // 这里需要申明，就可以使用User这个实体了
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],// 加上这行
})
export class UserModule {}
