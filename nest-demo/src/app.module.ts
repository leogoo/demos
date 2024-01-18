import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CreatureModule } from './creature/creature.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1000s' },
    }),
    PersonModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CreatureModule,
    // typeorm默认使用ormconfig.json这个配置文件。 也可以能过forRoot的参数中确认
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
      "username": "root",
      "password": "123456",   // 你的数据库密码
      "database": "mydatabase",   // 你的数据库
      "synchronize": true,
      "entities": ["dist/**/*.entity{ .ts,.js}"]  // 按照这里的配置，所有entity的对象可以自动注入，不需导入到任何模块了
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
