/**
 * @author: ntwari egide
 * @description: app main controller end points handler
 */

import { Controller, Get, OnApplicationBootstrap } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';

@Controller()
export class AppController implements OnApplicationBootstrap {
  constructor(
    private readonly appService: AppService,
    private readonly productService: ProductService
  ) {}
  onApplicationBootstrap() {
  
      console.log('Clearing all stored data....');

      this.productService.removeAll()

      console.log('Calling initilize catelog ....');
    
      let productInfo = [{"mass_g": 700, "productName": "RBC A+ Adult", "productId": '0'}, {"mass_g": 700,
      "productName": "RBC B+ Adult", "productId": '1'}, {"mass_g": 750, "productName": "RBC  AB+ Adult", "productId": '2'}, {"mass_g": 680, "productName": "RBC O- Adult",
      "productId": '3'}, {"mass_g": 350, "productName": "RBC A+ Child", "productId": '4'},
      {"mass_g": 200, "productName": "RBC AB+ Child", "productId": '5'}, {"mass_g": 120,
      "productName": "PLT AB+", "productId": '6'}, {"mass_g": 80, "productName": "PLT O+",
      "productId": '7'}, {"mass_g": 40, "productName": "CRYO A+", "productId": '8'}, {"mass_g":
      80, "productName": "CRYO AB+", "productId": '9'}, {"mass_g": 300, "productName":
      "FFP A+", "productId": '10'}, {"mass_g": 300, "productName": "FFP B+", "productId": '11'},
      {"mass_g": 300, "productName": "FFP AB+", "productId": '12'}]

      this.productService.initCatalog(productInfo)
  
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
