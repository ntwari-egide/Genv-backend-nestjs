import { PartialType } from '@nestjs/swagger';
import { CreateShippedProductDto } from './create-shipped-product.dto';

export class UpdateShippedProductDto extends PartialType(CreateShippedProductDto) {}
