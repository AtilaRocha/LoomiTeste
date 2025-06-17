import { PrismaClient } from '@prisma/client';

export class PrismaRepository<T> {
  constructor(
    protected prisma: PrismaClient,
    protected modelDelegate: any,
  ) {}

  async create(data: any): Promise<T> {
    return this.modelDelegate.create({ data });
  }

  async update(id: number, data: any): Promise<T> {
    return this.modelDelegate.update({
      where: { id },
      data,
    });
  }

  async findById(id: number): Promise<T | null> {
    return this.modelDelegate.findUnique({
      where: { id },
    });
  }

  async findOne(where: any): Promise<T | null> {
    return this.modelDelegate.findFirst({
      where,
    });
  }

  async delete(id: number): Promise<T> {
    return this.modelDelegate.delete({
      where: { id },
    });
  }

  async get(where: any): Promise<T[]> {
    return this.modelDelegate.findMany({
      where,
    });
  }
}
