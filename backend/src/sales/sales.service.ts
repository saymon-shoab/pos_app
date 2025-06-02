import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './entities/sale.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

interface SaleItem {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SaleEntity)
    private saleRepo: Repository<SaleEntity>,

    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const updatedProducts: ProductEntity[] = [];
    const saleItems: SaleItem[] = [];
    let totalAmount = 0;

    for (const item of createSaleDto.items) {
      const product = await this.productRepo.findOneBy({ id: item.id });
      console.log(product);
      if (!product)
        throw new NotFoundException(`Product ID ${item.productId} not found`);
      if (product.quantity < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for product ${product.name}`,
        );
      }
      // Decrease stock
      product.quantity -= item.quantity;
      updatedProducts.push(product);

      // Build sale item with snapshot info
      const subTotal = product.price * item.quantity;
      saleItems.push({
        productId: product.id,
        name: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        subTotal,
      });

      totalAmount += subTotal;
    }

    await this.productRepo.save(updatedProducts);

    const sale = this.saleRepo.create({
      items: saleItems,
      totalAmount,
    });

    return this.saleRepo.save(sale);
  }
}
