/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Response } from 'express';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto, @Res() res: Response) {
    const sale = await this.salesService.create(createSaleDto);

    return res.status(HttpStatus.CREATED).json({
      message: 'Sale created successfully!',
      statusCode: HttpStatus.CREATED,
      data: sale,
    });
  }
}
