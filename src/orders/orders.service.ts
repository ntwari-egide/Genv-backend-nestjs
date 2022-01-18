/**
 * @author: ntwari egide
 * @description: orders service implementation
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
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

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
