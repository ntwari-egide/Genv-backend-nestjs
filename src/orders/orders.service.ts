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
import { CreateShipmentDto } from 'src/shipments/dto/create-shipment.dto';
import { CreateShippedProductDto } from 'src/shipped-products/dto/create-shipped-product.dto';
import { StoredProductsService } from 'src/stored-products/stored-products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './orders.interface';

@Injectable()
export class OrdersService {

  constructor(
    @Inject('ORDER_MODEL')
    private orderModel : Model<Order>,

    private orderedProductService: OrderedProductsService,

    private storedProductService: StoredProductsService,
    

  ){}

  private responseHandler = new GlobalCustomizedApiResponse()

  private readonly logger = new Logger(OrderedProductsService.name)

  checkOrderFitnessInSingleShipment (orderedProducts: OrderedProduct[]): Boolean {

    let totalMass_g = 0    

    for(let product in orderedProducts) {
        
        totalMass_g += (orderedProducts[product].product.mass_g * orderedProducts[product].quantity)
    }

    if(totalMass_g > 1800){
      return false
    }
    else{
      return true
    }

  }

  

  async create(createOrderDto: CreateOrderDto): Promise<GlobalCustomizedApiResponse> {

    let newOrder = new this.orderModel(createOrderDto)    

    let orderedProducts: OrderedProduct[] = [] 

    for(let i in createOrderDto.requested) {

      let orderedProduct = await this.orderedProductService.create(createOrderDto.requested[i])

      orderedProducts.push(orderedProduct)
    }

    // check shipment possibilities

    if(! this.checkOrderFitnessInSingleShipment(orderedProducts)) {
      this.logger.log('Your package is big, can not be handled by single shipment')

      this.responseHandler.status = "FAILED"

      this.responseHandler.message = 'Your order is bigger than 1.8kg, can not be handled by single shipment '
      this.responseHandler.payload = []
  
      this.responseHandler.length = 0
  
      return this.responseHandler
    }

    // check the store and reduce store on each product

    let counter = 0

    // saving an order 

    newOrder.orderedProducts = orderedProducts

    newOrder.orderCompleteStatus = "COMPLETED"
    
    let savedOrder = await newOrder.save()

    let productsTobeShipped: CreateShippedProductDto[] = []

    for(let i in orderedProducts) 

      if(this.storedProductService.checkStoredProductAvailabilityAndReduceStore(orderedProducts[i].product.id, orderedProducts[i].quantity))  {
        
        counter ++ 

        // recording a product to be shipped from store

        let shippedProduct : CreateShippedProductDto= {
          productId: undefined,
          quantity: undefined
        }


        shippedProduct.productId = orderedProducts[i].product.id 

        shippedProduct.quantity = orderedProducts[i].quantity

        productsTobeShipped.push(shippedProduct)

        // updating stored product
        this.orderedProductService.updateOrderStatus(orderedProducts[i].id, true)
        
      }

      // shipping a package of products 

      let shipment: CreateShipmentDto = {
        shipmentId: undefined,
        orderId: undefined,
        shippedProducts: productsTobeShipped
      }





    // changing status of an order
    
    

    // if(counter == createOrderDto.requested.length) this.updateOrderStatus(savedOrder.id, "COMPLETED")

    // if(counter < createOrderDto.requested.length && counter != 0) this.updateOrderStatus(savedOrder.id, "PARTIAL")

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

  async updateOrderStatus(id: String, orderCompleteStatus: String) {
    
    let storeFound = await this.checkOrderExistence(id);

    storeFound._id = id

    storeFound.orderCompleteStatus = orderCompleteStatus
    
    let data =  this.orderModel.findOneAndUpdate(id, storeFound)

    return data

  }

  update(id: String, updateOrderDto: UpdateOrderDto) {
    
    let newOrder =this.checkOrderExistence(id)    

    let orderedProducts: [OrderedProduct] 

    for(let id in updateOrderDto.requested) {
      let orderedProduct = this.orderedProductService.checkOrderedProductExistence(id)

      orderedProducts.push(orderedProduct)
    }

    newOrder.orderedProducts = orderedProducts

    this.logger.log('Updating order with id : '+id)

    newOrder.orderCompleteStatus = updateOrderDto.orderCompleteStatus

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
