import { Test, TestingModule } from '@nestjs/testing';
import { ShippedProductsService } from './shipped-products.service';

describe('ShippedProductsService', () => {
  let service: ShippedProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippedProductsService],
    }).compile();

    service = module.get<ShippedProductsService>(ShippedProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
