/**
 * @author: ntwari egide
 * @description: create stored product dto
 */

 import { ApiProperty } from "@nestjs/swagger"

 export class CreateStoredProductDto {
 
     @ApiProperty({
         description: "product id"
     })
     productId: String
  
     @ApiProperty({
         description: "quantity of a product"
     })
     quantity: number
 
 }
 