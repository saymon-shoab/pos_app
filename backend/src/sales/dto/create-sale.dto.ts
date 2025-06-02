import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindOperator } from 'typeorm';

class SaleItemDto {
  productId: number;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  id: number | FindOperator<number> | undefined;
}

export class CreateSaleDto {
  @IsArray()
  @ValidateNested({ each: true })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => SaleItemDto)
  items: SaleItemDto[];
  totalAmount: number;
}
