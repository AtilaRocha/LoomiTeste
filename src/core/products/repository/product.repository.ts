import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/postgres/prisma/prisma.service';
import type { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async save(
    data:
      | Prisma.ProductCreateInput
      | (Prisma.ProductUpdateInput & { id?: number }),
  ): Promise<Product> {
    if ('id' in data && data.id) {
      // Update
      const { id, ...updated_ata } = data;
      return this.prisma.product.update({
        where: { id },
        data: updated_ata,
      });
    } else {
      // Create
      return this.prisma.product.create({
        data: data as Prisma.ProductCreateInput,
      });
    }
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        items: true,
      },
    });
  }

  async findByName(name: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive', // busca case-insensitive
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async findBy(where: Prisma.ProductWhereInput): Promise<Product[]> {
    return this.prisma.product.findMany({
      where,
      include: {
        items: true,
      },
    });
  }
}
