/**
 * @author: ntwari egide
 * @description: update order dto
 */

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderedProductDto } from 'src/ordered-products/dto/create-ordered-product.dto';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    
    @ApiProperty({
        description: "order id"
    })
    orderId: String

    @ApiProperty({
        description: "all ordered products"
    })
    orderedProducts: [CreateOrderedProductDto]
}
