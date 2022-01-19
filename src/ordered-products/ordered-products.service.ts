/**
 * @author: ntwari egide
 * @description: ordered products service implementation
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrderedProductNotFoundException } from 'src/exceptions/OrderedProductNotFoundException';
import { GlobalCustomizedApiResponse } from 'src/global-dto/api-response';
import { ProductService } from 'src/product/product.service';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';
import { OrderedProduct } from './ordered-products.interface';

@Injectable()

export class OrderedProductsService {

  constructor(
    @Inject('ORDERED_PRODUCT_MODEL')
    private orderedProductModel: Model<OrderedProduct>,
  
    private productService: ProductService
  ){}


  private responseHandler = new GlobalCustomizedApiResponse()

  private readonly logger = new Logger(OrderedProductsService.name)


  async create(createOrderedProductDto: CreateOrderedProductDto): Promise<OrderedProduct> {

    let newOrderedProduct =  new this.orderedProductModel(createOrderedProductDto)

    let relatedProduct = await this.productService.checkProductExistence(createOrderedProductDto.productId)
    
    newOrderedProduct.product =  relatedProduct

    this.logger.log("Add new ordered product ....")

    return newOrderedProduct.save()
  }

  async findAll() : Promise<GlobalCustomizedApiResponse>{
    this.logger.log("Getting list of all ordered products ....")

    let data = await this.orderedProductModel.find().exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting all ordered products '

    this.responseHandler.payload = data

    this.responseHandler.length = data.length

    return this.responseHandler

  }


  checkOrderedProductExistence = (id: String) : OrderedProduct => {
    let orderedProduct : any
    try {
      orderedProduct = this.orderedProductModel.findById(id).exec()

      this.logger.log('Getting ordered product with id : '+id)
      
    } catch (error) {

      this.logger.log('Getting ordered product with id: '+id+" has failed")

      throw new OrderedProductNotFoundException('Ordered product with id '+id+ ' is not found')

    }

    return orderedProduct
  }

  findOne(id: String) {
    let data = this.checkOrderedProductExistence(id)

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting ordered product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler
  }

  async update(id: String, updateOrderedProductDto: UpdateOrderedProductDto) : Promise<GlobalCustomizedApiResponse>{

    let relatedProduct = await this.productService.checkProductExistence(updateOrderedProductDto.productId)

    let orderedProduct = this.checkOrderedProductExistence(id)

    orderedProduct.product = relatedProduct

    this.logger.log('Updating ordered product with id : '+id)

    let data = this.orderedProductModel.findByIdAndUpdate(id, orderedProduct).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Updated ordered product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }

  async remove(id: String) {
    
    this.checkOrderedProductExistence(id)

    this.logger.log('Deleting ordered product with id : '+id)

    let data = this.orderedProductModel.findByIdAndRemove(id).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Deleted ordered product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }
}
