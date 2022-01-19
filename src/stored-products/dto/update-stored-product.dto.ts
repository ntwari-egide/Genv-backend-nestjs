/**
 * @author: ntwari egide
 * @description: update ordered product dto
 */

 import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStoredProductDto } from './create-stored-product.dto';
 
 export class UpdateStoredProductDto extends PartialType(CreateStoredProductDto) {
     @ApiProperty({
         description: "product id"
     })
     productId: String
  
     @ApiProperty({
         description: "quantity of a product"
     })
     quantity: Number
}
 