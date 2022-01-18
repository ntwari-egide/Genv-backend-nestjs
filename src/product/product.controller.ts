/**
 * @author: ntwari egide
 * @description: products controller endpoints handler
 */

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createUpdateDto: CreateProductDto) {

    return this.productService.create(createUpdateDto);
  }

  @Get()
  findAll() {

    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
