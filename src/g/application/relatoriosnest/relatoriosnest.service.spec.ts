import { Test, TestingModule } from '@nestjs/testing';
import { RelatoriosnestService } from './relatoriosnest.service';

describe('RelatoriosnestService', () => {
  let service: RelatoriosnestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelatoriosnestService],
    }).compile();

    service = module.get<RelatoriosnestService>(RelatoriosnestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
