import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  
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
