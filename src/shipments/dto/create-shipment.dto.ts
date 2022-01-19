/**
 * @author: ntwari egide
 * @description: create shipment dto
 */

import { ApiProperty } from "@nestjs/swagger";
import { CreateShippedProductDto } from "src/shipped-products/dto/create-shipped-product.dto";

export class CreateShipmentDto {
    @ApiProperty({
        description: "shipment id"
    })
    shipmentId: String

    
    @ApiProperty({
        description: "order id"
    })
    orderId: String
    
    @ApiProperty({
        description: "all shipped products products",
        type: [CreateShippedProductDto]
    })
    shippedProducts: [CreateShippedProductDto]
}
