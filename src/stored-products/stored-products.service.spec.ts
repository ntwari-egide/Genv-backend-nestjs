import { Test, TestingModule } from '@nestjs/testing';
import { StoredProductsService } from './stored-products.service';

describe('StoredProductsService', () => {
  let service: StoredProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoredProductsService],
    }).compile();

    service = module.get<StoredProductsService>(StoredProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
