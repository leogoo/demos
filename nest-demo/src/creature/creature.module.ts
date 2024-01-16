import { Module, Global } from '@nestjs/common';
import { CreatureService } from './creature.service';
import { CreatureController } from './creature.controller';

@Global() // 声明为全局
@Module({
  controllers: [CreatureController],
  providers: [CreatureService],
  exports: [CreatureService],
})
export class CreatureModule {}
