/**
 * @author: ntwari egide
 * @description: update shipped product dto
 */

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateShippedProductDto } from './create-shipped-product.dto';
 
 export class UpdateShippedProductDto extends PartialType(CreateShippedProductDto) {
     @ApiProperty({
         description: "product id"
     })
     productId: String
  
     @ApiProperty({
         description: "quantity of a product"
     })
     quantity: Number
}
 