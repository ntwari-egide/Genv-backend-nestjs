import { PartialType } from '@nestjs/swagger';
import { CreateOrderedProductDto } from './create-ordered-product.dto';

export class UpdateOrderedProductDto extends PartialType(CreateOrderedProductDto) {}
