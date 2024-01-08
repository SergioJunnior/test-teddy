import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  async create<T>(modelName: string, createArgs: any): Promise<T> {
    try {
      const createdModel: T = await prisma[modelName].create(createArgs);
      return createdModel;
    } catch (error) {
      throw new Error(`Erro ao criar ${modelName}`);
    }
  }

  async update<T>(modelName: string, updateArgs: any): Promise<T> {
    try {
      const updatedModel: T = await prisma[modelName].update(updateArgs);
      return updatedModel;
    } catch (error) {
      throw new Error(`Erro ao dar update ${modelName}`);
    }
  }

  async deleteAndLog<T>(modelName: string, deleteArgs: any): Promise<T> {
    try {
      const deletedModel: T = await prisma[modelName].update(deleteArgs);
      return deletedModel;
    } catch (error) {
      throw new Error(`Erro ao dar update ${modelName}`);
    }
  }
}
