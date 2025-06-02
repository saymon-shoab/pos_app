import {
  IsString,
  IsNumber,
  Min,
  IsNotEmpty,
  MaxLength,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  @MaxLength(255, { message: 'Product name must not exceed 255 characters' })
  name: string;

  @IsNotEmpty({ message: 'Product code is required' })
  @MaxLength(20, { message: 'Product code must not exceed 20 characters' })
  @IsString()
  code: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with maximum 2 decimal places' },
  )
  @IsPositive({ message: 'Price must be greater than 0' })
  price: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with maximum 2 decimal places' },
  )
  @IsPositive({ message: 'Price must be greater than 0' })
  @Min(0)
  quantity: number;
}
