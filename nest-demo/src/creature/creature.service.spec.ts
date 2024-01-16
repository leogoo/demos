import { Test, TestingModule } from '@nestjs/testing';
import { CreatureService } from './creature.service';

describe('CreatureService', () => {
  let service: CreatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatureService],
    }).compile();

    service = module.get<CreatureService>(CreatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
