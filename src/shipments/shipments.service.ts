/**
 * @author: ntwari egide
 * @description: shipment service implementation
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { ShipmentNotFoundException } from 'src/exceptions/ShipmentNotFoundException';
import { GlobalCustomizedApiResponse } from 'src/global-dto/api-response';
import { OrdersService } from 'src/orders/orders.service';
import { ShippedProduct } from 'src/shipped-products/shipped-products.interface';
import { ShippedProductsService } from 'src/shipped-products/shipped-products.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './shipment.interface';

@Injectable()
export class ShipmentsService {

  constructor(
    @Inject('SHIPMENT_MODEL')
    private shipmentModel : Model<Shipment>,

    private orderService: OrdersService,

    private shippedProductService: ShippedProductsService

  ){}


  private responseHandler = new GlobalCustomizedApiResponse()

  private readonly logger = new Logger(ShipmentsService.name)


  async create(createShipmentDto: CreateShipmentDto): Promise<GlobalCustomizedApiResponse> {

    
    let newShipment = new this.shipmentModel(createShipmentDto)    

    let shippedProducts: ShippedProduct[] = [] 

    for(let i in createShipmentDto.shippedProducts) {

      let shippedProduct = await this.shippedProductService.create(createShipmentDto.shippedProducts[i])

      shippedProducts.push(await shippedProduct)
    }

    newShipment.shippedProducts = await shippedProducts

    let order = await  this.orderService.checkOrderExistence(createShipmentDto.orderId)

    newShipment.order = order    
    
    let savedShipment = await newShipment.save()

    console.log('New shipmentModel: ', newShipment);

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Saving new order... '

    this.responseHandler.payload =  savedShipment

    this.responseHandler.length = 1

    return this.responseHandler
  }

  async findAll(): Promise<GlobalCustomizedApiResponse> {
    
    this.logger.log("Getting list of all shipments ....")

    let data = await this.shipmentModel.find().exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting all shipments '

    this.responseHandler.payload = data

    this.responseHandler.length = data.length

    return this.responseHandler

  }

  checkOrderExistence = (id: String): Shipment => {

    let shipment : any

    try {
      shipment = this.shipmentModel.findById(id).exec()

      this.logger.log('Getting shipment with id : '+id)

    } catch (error) {
      
      this.logger.log('Getting shipment with id: '+id+" has failed")

      throw new ShipmentNotFoundException(" shipment with id: "+id+" is not found!")

    }

    return shipment

  }

  async findOne(id: String) {
    let data = this.checkOrderExistence(id)

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting shipment with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }

  update(id: number, updateShipmentDto: UpdateShipmentDto) {
    return `This action updates a #${id} shipment`;
  }

  remove(id: String) {
    this.checkOrderExistence(id)

    this.logger.log('Deleting shipment with id : '+id)

    let data = this.shipmentModel.findByIdAndRemove(id).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Deleted shipment with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler
  }
}
