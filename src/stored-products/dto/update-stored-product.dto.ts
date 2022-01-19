import { PartialType } from '@nestjs/swagger';
import { CreateStoredProductDto } from './create-stored-product.dto';

export class UpdateStoredProductDto extends PartialType(CreateStoredProductDto) {}
