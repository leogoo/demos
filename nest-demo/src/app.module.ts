import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CreatureModule } from './creature/creature.module';

@Module({
  imports: [
    PersonModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CreatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
