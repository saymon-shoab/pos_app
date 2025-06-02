import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return await this.productRepo.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updated = this.productRepo.merge(product, updateProductDto);
    return this.productRepo.save(updated);
  }
  findAll() {
    return this.productRepo.find();
  }

  async search(query: string) {
    return this.productRepo.find({
      where: [{ name: ILike(`%${query}%`) }, { code: ILike(`%${query}%`) }],
    });
  }
}
