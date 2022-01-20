/**
 * @author: ntwari egide
 * @description: create order dto
 */

import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderedProductDto } from "src/ordered-products/dto/create-ordered-product.dto";

export class CreateOrderDto {

    @ApiProperty({
        description: "order id"
    })
    orderId: String

    @ApiProperty({
        description: "all ordered products",
        type: [CreateOrderedProductDto]
    })
    requested: [CreateOrderedProductDto]

}
