/**
 * @author: ntwari egide
 * @description: product service implementation
 */

import { Inject, Injectable, Logger, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductNotFoundException } from 'src/exceptions/ProductNotFoundException';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.interface';
import { UpdateProductDto } from './dto/update-product.dto';
import { GlobalCustomizedApiResponse } from 'src/global-dto/api-response';

@Injectable()
export class ProductService{

  constructor(  
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>
  ){}
  private responseHandler = new GlobalCustomizedApiResponse()

  private readonly logger = new Logger(ProductService.name)


  async create(createProductDto: CreateProductDto): Promise<Product> {

    let registerProduct = new this.productModel(createProductDto)

    this.logger.log('Saving new product to catelog ...')

    return registerProduct.save()
  }

  async initCatalog(products: CreateProductDto[]) {

    for(let product in products) {      
      this.create(products[product])
      
    }

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

  async checkProductExistence (id: String) : Promise<Product> {
    let product : any
    try {
      product = await this.productModel.findById(id).exec()

      this.logger.log('Getting a product with id : '+id)
      
    } catch (error) {

      this.logger.log('Getting a product with id: '+id+" has failed")

      throw new ProductNotFoundException('Product with id '+id+ ' is not found')

    }

    return product
  }

  async findOne(id: String): Promise<GlobalCustomizedApiResponse> {

    let data = await this.checkProductExistence(id) 

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

  async removeAll() {
    this.logger.log('Clearing all products details .... ')
 
    return this.productModel.deleteMany({})
  }
}
