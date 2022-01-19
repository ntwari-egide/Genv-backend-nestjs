/**
 * @author: ntwari egide
 * @description: create product dto
 */

import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

export class CreateProductDto {
  
    @ApiProperty({
        description: "Product Id",
        default: '001',
        type: String
    })
    productId: String
  
    @ApiProperty({
        description: "Name of product",
        default: 'RBC A+ Adult',
        minimum: 1,
        type: String
    })
    productName: String
  
    @ApiProperty({
        description: "Mass of product",
        type: Number
    })
    mass_g: Number
}
