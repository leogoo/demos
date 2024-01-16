import { Test, TestingModule } from '@nestjs/testing';
import { CreatureController } from './creature.controller';
import { CreatureService } from './creature.service';

describe('CreatureController', () => {
  let controller: CreatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatureController],
      providers: [CreatureService],
    }).compile();

    controller = module.get<CreatureController>(CreatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
