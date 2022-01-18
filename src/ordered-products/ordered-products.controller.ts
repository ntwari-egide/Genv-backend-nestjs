import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderedProductsService } from './ordered-products.service';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';

@Controller('ordered-products')
export class OrderedProductsController {
  constructor(private readonly orderedProductsService: OrderedProductsService) {}

  @Post()
  create(@Body() createOrderedProductDto: CreateOrderedProductDto) {
    return this.orderedProductsService.create(createOrderedProductDto);
  }

  @Get()
  findAll() {
    return this.orderedProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderedProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderedProductDto: UpdateOrderedProductDto) {
    return this.orderedProductsService.update(+id, updateOrderedProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderedProductsService.remove(+id);
  }
}
