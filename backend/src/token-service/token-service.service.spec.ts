import { Test, TestingModule } from '@nestjs/testing';
import { TokenServiceService } from './token-service.service';

describe('TokenServiceService', () => {
  let service: TokenServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenServiceService],
    }).compile();

    service = module.get<TokenServiceService>(TokenServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
