import { Injectable } from '@nestjs/common';
import { CreateStoredProductDto } from './dto/create-stored-product.dto';
import { UpdateStoredProductDto } from './dto/update-stored-product.dto';

@Injectable()
export class StoredProductsService {
  create(createStoredProductDto: CreateStoredProductDto) {
    return 'This action adds a new storedProduct';
  }

  findAll() {
    return `This action returns all storedProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storedProduct`;
  }

  update(id: number, updateStoredProductDto: UpdateStoredProductDto) {
    return `This action updates a #${id} storedProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} storedProduct`;
  }
}
