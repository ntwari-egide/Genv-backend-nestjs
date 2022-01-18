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
import { GlobalCustomizedApiResponse } from 'src/global-dto/api-response';

@Injectable()
export class ProductService {

  constructor(  
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>
  ){}

  private responseHandler = new GlobalCustomizedApiResponse()

  private readonly logger = new Logger(ProductService.name)

  async create(createProductDto: CreateProductDto): Promise<Product> {

    let registerProduct = new this.productModel(createProductDto)

    return registerProduct.save()
  }

  async findAll(): Promise<GlobalCustomizedApiResponse> {


    this.logger.log('Getting list of all products')

    this.responseHandler.message = "Getting list of all products"

    this.responseHandler.status = "success"

    let data = await  this.productModel.find().exec()

    this.responseHandler.payload = data

    this.responseHandler.length = data.length

    return this.responseHandler

  }

  checkProductExistence = (id: String) : Product => {
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

  async findOne(id: String): Promise<GlobalCustomizedApiResponse> {

    let data =  this.checkProductExistence(id)

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting a product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }

  async update(id: String, updateProductDto: UpdateProductDto): Promise<GlobalCustomizedApiResponse> {
    
    this.checkProductExistence(id)

    this.logger.log('Updating a product with id : '+id)

    let data = this.productModel.findOneAndUpdate(id, updateProductDto).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Updating a product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }

  async remove(id: String) {
    
    this.checkProductExistence(id)

    this.logger.log('Deleting a product with id : '+id)

    let data = this.productModel.findByIdAndRemove(id).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Updating a product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }
}
