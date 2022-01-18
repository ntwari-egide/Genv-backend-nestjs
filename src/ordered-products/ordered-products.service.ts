import { Injectable } from '@nestjs/common';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';

@Injectable()
export class OrderedProductsService {
  create(createOrderedProductDto: CreateOrderedProductDto) {
    return 'This action adds a new orderedProduct';
  }

  findAll() {
    return `This action returns all orderedProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderedProduct`;
  }

  update(id: number, updateOrderedProductDto: UpdateOrderedProductDto) {
    return `This action updates a #${id} orderedProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderedProduct`;
  }
}
