import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.service.create(createProductDto);
    return {
      message: 'Product created successfully',
      statusCode: HttpStatus.CREATED,
      data: product,
    };
  }

  @Get()
  async findAll() {
    const products = await this.service.findAll();
    return {
      message: 'Products retrieved successfully',
      statusCode: HttpStatus.OK,
      data: products,
    };
  }

  @Get('search')
  async search(@Query('q') query: string) {
    const results = await this.service.search(query);
    return {
      message: `Products search results for "${query}"`,
      statusCode: HttpStatus.OK,
      data: results,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.service.update(+id, updateProductDto);
    return {
      message: 'Product updated successfully',
      statusCode: HttpStatus.OK,
      data: updatedProduct,
    };
  }
}
