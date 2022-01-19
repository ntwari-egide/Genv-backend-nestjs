/**
 * @author: ntwari egide
 * @description: update shipments dto
 */

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateShippedProductDto } from 'src/shipped-products/dto/create-shipped-product.dto';
import { CreateShipmentDto } from './create-shipment.dto';

export class UpdateShipmentDto extends PartialType(CreateShipmentDto) {
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
