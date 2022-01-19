/**
 * @author: ntwari egide
 * @description: shipped stored product dto
 */

 import { ApiProperty } from "@nestjs/swagger"

 export class CreateShippedProductDto {
 
     @ApiProperty({
         description: "product id"
     })
     productId: String
  
     @ApiProperty({
         description: "quantity of a product"
     })
     quantity: Number
 
 }
 