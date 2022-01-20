/**
 * @author: ntwari egide
 * @description: create ordered product dto
 */

import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderedProductDto {

    @ApiProperty({
        description: "product id"
    })
    productId: String
 
    @ApiProperty({
        description: "quantity of a product"
    })
    quantity: number

}
