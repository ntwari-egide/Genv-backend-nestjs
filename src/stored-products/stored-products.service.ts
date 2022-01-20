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

  async checkStoredProductAvailabilityAndReduceStore (productId: String, quantity: number): Promise<Boolean> {

    let relatedProduct = await this.productService.checkProductExistence(productId)

    let foundStoredProduct = await this.storedProductModel.findOne({ product : relatedProduct})

    // checking existence of a product
    if( foundStoredProduct) {

      if(foundStoredProduct.quantity > quantity || foundStoredProduct.quantity == quantity) {

        this.updateStoredProductQuantinty(foundStoredProduct._id,foundStoredProduct.quantity - quantity)
        
        this.logger.log("Ordered products left the store ....")

        return true
        
      }
    }
    else{

      return false

    }

  }


  async create(createStoredProductDto: CreateStoredProductDto): Promise<StoredProduct> {

    let relatedProduct = await this.productService.checkProductExistence(createStoredProductDto.productId)
    

    let foundStoredProduct = await this.storedProductModel.findOne({ product: relatedProduct})
    

    if(! foundStoredProduct) {
      
      let newStoreProduct =  new this.storedProductModel(createStoredProductDto)
      
      newStoreProduct.product =  relatedProduct

      this.logger.log("Storing new product ....")

      return newStoreProduct.save()
    }
    
    else { 

      this.updateStoredProductQuantinty(foundStoredProduct._id,foundStoredProduct.quantity + createStoredProductDto.quantity)

    }
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

  async updateStoredProductQuantinty(id: String, quantity: number) {
    let storeFound = await this.checkStoredProductExistence(id);

    storeFound.quantity = quantity
    
    let data =  this.storedProductModel.findOneAndUpdate(id, storeFound)

    return data

  }
  
  checkStoredProductExistence = (id: String) : StoredProduct => {
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
    let data = this.checkStoredProductExistence(id)

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Getting stored product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler
  }


  async update(id: String, updateStoredProductDto: UpdateStoredProductDto) : Promise<GlobalCustomizedApiResponse>{

    let relatedProduct = await this.productService.checkProductExistence(updateStoredProductDto.productId)

    let orderedProduct = this.checkStoredProductExistence(id)

    orderedProduct.product = relatedProduct

    this.logger.log('Updating stored product with id : '+id)

    let data = this.storedProductModel.findOneAndUpdate(id, orderedProduct).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Updated stored product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }
  
  async remove(id: String) {
    
    this.checkStoredProductExistence(id)

    this.logger.log('Deleting stored product with id : '+id)

    let data = this.storedProductModel.findByIdAndRemove(id).exec()

    this.responseHandler.status = "success"

    this.responseHandler.message = 'Deleted ordered product with id : '+id

    this.responseHandler.payload = data

    this.responseHandler.length = 1

    return this.responseHandler

  }
}
