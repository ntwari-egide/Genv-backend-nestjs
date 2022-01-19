/**
 * @author: ntwari egide
 * @description: stored products service implementation
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { StoredProductNotFoundException } from 'src/exceptions/StoredProductNotFoundException';
import { GlobalCustomizedApiResponse } from 'src/global-dto/api-response';
import { ProductService } from 'src/product/product.service';
import { CreateStoredProductDto } from './dto/create-stored-product.dto';
import { UpdateStoredProductDto } from './dto/update-stored-product.dto';
import { StoredProduct } from './stored-products.interface';

@Injectable()
export class StoredProductsService {
  
  constructor(
    @Inject("STORED_PRODUCT_MODEL")
    private storedProductModel: Model<StoredProduct>,

    private productService: ProductService
  ){}

  private responseHandler = new GlobalCustomizedApiResponse()

  private readonly logger = new Logger(StoredProductsService.name)

  async create(createOrderedProductDto: CreateStoredProductDto): Promise<StoredProduct> {

    let newStoreProduct =  new this.storedProductModel(createOrderedProductDto)

    let relatedProduct = await this.productService.checkProductExistence(createOrderedProductDto.productId)
    
    newStoreProduct.product =  relatedProduct

    this.logger.log("Storing new product ....")

    return newStoreProduct.save()
  }

  async findAll() : Promise<GlobalCustomizedApiResponse>{
    this.logger.log("Getting list of all stored products ....")

    let data = await this.storedProductModel.find().exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting all stored products '

    this.responseHandler.payload = data

    this.responseHandler.length = data.length

    return this.responseHandler

  }

  
  checkOrderedProductExistence = (id: String) : StoredProduct => {
    let storedProduct : any
    try {
      storedProduct = this.storedProductModel.findById(id).exec()

      this.logger.log('Getting stored product with id : '+id)
      
    } catch (error) {

      this.logger.log('Getting stored product with id: '+id+" has failed")

      throw new StoredProductNotFoundException('Stored product with id '+id+ ' is not found')

    }

    return storedProduct
  }

  findOne(id: String) {
    let data = this.checkOrderedProductExistence(id)

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting stored product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler
  }


  async update(id: String, updateStoredProductDto: UpdateStoredProductDto) : Promise<GlobalCustomizedApiResponse>{

    let relatedProduct = await this.productService.checkProductExistence(updateStoredProductDto.productId)

    let orderedProduct = this.checkOrderedProductExistence(id)

    orderedProduct.product = relatedProduct

    this.logger.log('Updating stored product with id : '+id)

    let data = this.storedProductModel.findByIdAndUpdate(id, orderedProduct).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Updated stored product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }
  
  async remove(id: String) {
    
    this.checkOrderedProductExistence(id)

    this.logger.log('Deleting stored product with id : '+id)

    let data = this.storedProductModel.findByIdAndRemove(id).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Deleted ordered product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }
}
