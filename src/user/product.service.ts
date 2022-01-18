/**
 * @author: ntwari egide
 * @description: User service implementation
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductNotFoundException } from 'src/exceptions/ProductNotFoundException';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(  
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>
  ){}

  private readonly logger = new Logger(ProductService.name)

  async create(createProductDto: CreateProductDto): Promise<Product> {

    let registerProduct = new this.productModel(createProductDto)

    return registerProduct.save()
  }

  async findAll(): Promise<Product[]> {

    this.logger.log('Getting list of all products')

    return this.productModel.find().exec()

  }

  checkUserExistance = (id: String) : Product => {
    let product : any
    try {
      product = this.productModel.findById(id).exec()

      this.logger.log('Getting a product with id : '+id)
      
    } catch (error) {

      this.logger.log('Getting a product with id: '+id+" has failed")

      throw new ProductNotFoundException('Product with id '+id+ ' is not found')

    }

    return product
  }

  async findOne(id: String): Promise<Product> {

    return this.checkUserExistance(id)

  }

  async update(id: String, updateProductDto: UpdateProductDto): Promise<Product> {
    
    this.checkUserExistance(id)

    this.logger.log('Updating a product with id : '+id)

    return this.productModel.findByIdAndUpdate(id, updateProductDto).exec()

  }

  async remove(id: String) {
    
    this.checkUserExistance(id)

    this.logger.log('Deleting a product with id : '+id)

    return this.productModel.findByIdAndRemove(id).exec()

  }
}
