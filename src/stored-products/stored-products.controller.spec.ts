import { Test, TestingModule } from '@nestjs/testing';
import { StoredProductsController } from './stored-products.controller';
import { StoredProductsService } from './stored-products.service';

describe('StoredProductsController', () => {
  let controller: StoredProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoredProductsController],
      providers: [StoredProductsService],
    }).compile();

    controller = module.get<StoredProductsController>(StoredProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
