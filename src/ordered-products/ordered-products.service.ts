/**
 * @author: ntwari egide
 * @description: ordered products service implementation
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrderedProductNotFoundException } from 'src/exceptions/OrderedProductNotFoundException';
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


  private readonly logger = new Logger(OrderedProductsService.name)


  async create(createOrderedProductDto: CreateOrderedProductDto): Promise<OrderedProduct> {

    let newOrderedProduct =  new this.orderedProductModel(createOrderedProductDto)

    let relatedProduct = this.productService.checkProductExistence(createOrderedProductDto.productId)

    newOrderedProduct.product = relatedProduct

    this.logger.log("Add new ordered product ....")

    return newOrderedProduct.save()
  }

  async findAll() : Promise<OrderedProduct[]>{
    this.logger.log("Getting list of all ordered products ....")

    return this.orderedProductModel.find().exec()

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
    return this.checkOrderedProductExistence(id)
  }

  async update(id: String, updateOrderedProductDto: UpdateOrderedProductDto) : Promise<OrderedProduct>{

    let relatedProduct = this.productService.checkProductExistence(updateOrderedProductDto.productId)

    let orderedProduct = this.checkOrderedProductExistence(id)

    orderedProduct.product = relatedProduct

    this.logger.log('Updating ordered product with id : '+id)

    return this.orderedProductModel.findByIdAndUpdate(id, orderedProduct).exec()

  }

  async remove(id: String) {
    
    this.checkOrderedProductExistence(id)

    this.logger.log('Deleting ordered product with id : '+id)

    return this.orderedProductModel.findByIdAndRemove(id).exec()

  }
}
