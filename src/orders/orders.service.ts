/**
 * @author: ntwari egide
 * @description: orders service implementation
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { OrderNotFoundException } from 'src/exceptions/OrderNotFoundException';
import { GlobalCustomizedApiResponse } from 'src/global-dto/api-response';
import { OrderedProduct } from 'src/ordered-products/ordered-products.interface';
import { OrderedProductsService } from 'src/ordered-products/ordered-products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './orders.interface';

@Injectable()
export class OrdersService {

  constructor(
    @Inject('ORDER_MODEL')
    private orderModel : Model<Order>,

    private orderedProductService: OrderedProductsService
  ){}

  private responseHandler = new GlobalCustomizedApiResponse()

  private readonly logger = new Logger(OrderedProductsService.name)

  async create(createOrderDto: CreateOrderDto): Promise<GlobalCustomizedApiResponse> {

    let newOrder = new this.orderModel(createOrderDto)    

    let orderedProducts: [OrderedProduct] 

    for(let id in createOrderDto.orderedProducts) {
      let orderedProduct = this.orderedProductService.checkOrderedProductExistence(id)

      orderedProducts.push(orderedProduct)
    }

    newOrder.orderedProducts = orderedProducts

    let savedOrder =  newOrder.save()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Saving new order... '

    this.responseHandler.payload = savedOrder

    this.responseHandler.length = 1

    return this.responseHandler
  }

  async findAll(): Promise<GlobalCustomizedApiResponse> {
    
    this.logger.log("Getting list of all orders ....")

    let data = await this.orderModel.find().exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting all orders '

    this.responseHandler.payload = data

    this.responseHandler.length = data.length

    return this.responseHandler

  }

  checkOrderExistence = (id: String): Order => {

    let order : any

    try {
      order = this.orderModel.findById(id).exec()

      this.logger.log('Getting orders with id : '+id)

    } catch (error) {
      
      this.logger.log('Getting orders with id: '+id+" has failed")

      throw new OrderNotFoundException(" Order with id: "+id+" is not found!")

    }

    return order

  }

  async findOne(id: String) {
    let data = this.checkOrderExistence(id)

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting orders with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }

  update(id: String, updateOrderDto: UpdateOrderDto) {
    
    let newOrder =this.checkOrderExistence(id)    

    let orderedProducts: [OrderedProduct] 

    for(let id in updateOrderDto.orderedProducts) {
      let orderedProduct = this.orderedProductService.checkOrderedProductExistence(id)

      orderedProducts.push(orderedProduct)
    }

    newOrder.orderedProducts = orderedProducts

    this.logger.log('Updating order with id : '+id)

    let savedOrder =  this.orderModel.findOneAndUpdate(id, newOrder)   

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Updated order with id: '+id

    this.responseHandler.payload = savedOrder

    this.responseHandler.length = 1

    return this.responseHandler
  }

  remove(id: String) {
    this.checkOrderExistence(id)

    this.logger.log('Deleting order with id : '+id)

    let data = this.orderModel.findByIdAndRemove(id).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Deleted order with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler
  }
}
