import { Injectable } from '@nestjs/common';
import { CreateShippedProductDto } from './dto/create-shipped-product.dto';
import { UpdateShippedProductDto } from './dto/update-shipped-product.dto';

@Injectable()
export class ShippedProductsService {
  create(createShippedProductDto: CreateShippedProductDto) {
    return 'This action adds a new shippedProduct';
  }

  findAll() {
    return `This action returns all shippedProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shippedProduct`;
  }

  update(id: number, updateShippedProductDto: UpdateShippedProductDto) {
    return `This action updates a #${id} shippedProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippedProduct`;
  }
}
