/**
 * @author: ntwari egide
 * @description: update ordered product dto
 */

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderedProductDto } from './create-ordered-product.dto';

export class UpdateOrderedProductDto extends PartialType(CreateOrderedProductDto) {
    @ApiProperty({
        description: "product id"
    })
    productId: String
 
    @ApiProperty({
        description: "quantity of a product"
    })
    quantity: Number

    @ApiProperty({
        description: "quantity of a product"
    })
    isShipped: Boolean
}
