import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippedProductsService } from './shipped-products.service';
import { CreateShippedProductDto } from './dto/create-shipped-product.dto';
import { UpdateShippedProductDto } from './dto/update-shipped-product.dto';

@Controller('shipped-products')
export class ShippedProductsController {
  constructor(private readonly shippedProductsService: ShippedProductsService) {}

  @Post()
  create(@Body() createShippedProductDto: CreateShippedProductDto) {
    return this.shippedProductsService.create(createShippedProductDto);
  }

  @Get()
  findAll() {
    return this.shippedProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippedProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippedProductDto: UpdateShippedProductDto) {
    return this.shippedProductsService.update(+id, updateShippedProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippedProductsService.remove(+id);
  }
}
