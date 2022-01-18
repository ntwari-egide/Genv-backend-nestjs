import { Test, TestingModule } from '@nestjs/testing';
import { OrderedProductsController } from './ordered-products.controller';
import { OrderedProductsService } from './ordered-products.service';

describe('OrderedProductsController', () => {
  let controller: OrderedProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderedProductsController],
      providers: [OrderedProductsService],
    }).compile();

    controller = module.get<OrderedProductsController>(OrderedProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
