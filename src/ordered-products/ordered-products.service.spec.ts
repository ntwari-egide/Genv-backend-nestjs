import { Test, TestingModule } from '@nestjs/testing';
import { OrderedProductsService } from './ordered-products.service';

describe('OrderedProductsService', () => {
  let service: OrderedProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderedProductsService],
    }).compile();

    service = module.get<OrderedProductsService>(OrderedProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
