import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoredProductsService } from './stored-products.service';
import { CreateStoredProductDto } from './dto/create-stored-product.dto';
import { UpdateStoredProductDto } from './dto/update-stored-product.dto';

@Controller('stored-products')
export class StoredProductsController {
  constructor(private readonly storedProductsService: StoredProductsService) {}

  @Post()
  create(@Body() createStoredProductDto: CreateStoredProductDto) {
    return this.storedProductsService.create(createStoredProductDto);
  }

  @Get()
  findAll() {
    return this.storedProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storedProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoredProductDto: UpdateStoredProductDto) {
    return this.storedProductsService.update(+id, updateStoredProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storedProductsService.remove(+id);
  }
}