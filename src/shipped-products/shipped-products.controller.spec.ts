import { Test, TestingModule } from '@nestjs/testing';
import { ShippedProductsController } from './shipped-products.controller';
import { ShippedProductsService } from './shipped-products.service';

describe('ShippedProductsController', () => {
  let controller: ShippedProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippedProductsController],
      providers: [ShippedProductsService],
    }).compile();

    controller = module.get<ShippedProductsController>(ShippedProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
