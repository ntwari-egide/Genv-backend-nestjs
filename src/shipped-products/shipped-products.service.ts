/**
 * @author: ntwari egide
 * @description: shipped products service implementation
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { ShippedProductNotFoundException } from 'src/exceptions/ShippedProductNotFoundException';
import { GlobalCustomizedApiResponse } from 'src/global-dto/api-response';
import { ProductService } from 'src/product/product.service';
import { CreateShippedProductDto } from './dto/create-shipped-product.dto';
import { UpdateShippedProductDto } from './dto/update-shipped-product.dto';
import { ShippedProduct } from './shipped-products.interface';

@Injectable()
export class ShippedProductsService {
  constructor(
    @Inject("SHIPPED_PRODUCT_MODEL")
    private shippedProductModel: Model<ShippedProduct>,

    private productService: ProductService
  ){}

  private responseHandler = new GlobalCustomizedApiResponse()

  private readonly logger = new Logger(ShippedProductsService.name)

  async create(createShippedProductDto: CreateShippedProductDto): Promise<ShippedProduct> {

    let newShippedProduct =  new this.shippedProductModel(createShippedProductDto)

    let relatedProduct = await this.productService.checkProductExistence(createShippedProductDto.productId)
    
    newShippedProduct.product =  relatedProduct

    this.logger.log("shipping new product ....")

    return newShippedProduct.save()
  }

  async findAll() : Promise<GlobalCustomizedApiResponse>{
    this.logger.log("Getting list of all shipped products ....")

    let data = await this.shippedProductModel.find().exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting all shipped products '

    this.responseHandler.payload = data

    this.responseHandler.length = data.length

    return this.responseHandler

  }

  
  checkOrderedProductExistence = (id: String) : ShippedProduct => {
    let shippedProduct : any
    try {
      shippedProduct = this.shippedProductModel.findById(id).exec()

      this.logger.log('Getting shipped product with id : '+id)
      
    } catch (error) {

      this.logger.log('Getting shipped product with id: '+id+" has failed")

      throw new ShippedProductNotFoundException('Stored product with id '+id+ ' is not found')

    }

    return shippedProduct
  }

  findOne(id: String) {
    let data = this.checkOrderedProductExistence(id)

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting stored product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler
  }


  async update(id: String, updates: UpdateShippedProductDto) : Promise<GlobalCustomizedApiResponse>{

    let relatedProduct = await this.productService.checkProductExistence(updates.productId)

    let orderedProduct = this.checkOrderedProductExistence(id)

    orderedProduct.product = relatedProduct

    this.logger.log('Updating stored product with id : '+id)

    let data = this.shippedProductModel.findByIdAndUpdate(id, orderedProduct).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Updated shipped product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }
  
  async remove(id: String) {
    
    this.checkOrderedProductExistence(id)

    this.logger.log('Deleting shipped product with id : '+id)

    let data = this.shippedProductModel.findByIdAndRemove(id).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Deleted shipped product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }
}
