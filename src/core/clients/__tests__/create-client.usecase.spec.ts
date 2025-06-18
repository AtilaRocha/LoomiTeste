import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientUsecase } from '../usecases/create-client.usecase';
import { ClientRepository } from '../repository/client.repository';
import {
  CreateClientUsecaseInput,
  CreateClientUsecaseOutput,
} from '../interfaces/create.client.usecase.interface';

describe('CreateClientUsecase', () => {
  let usecase: CreateClientUsecase;
  let repository: Partial<jest.Mocked<ClientRepository>>;

  beforeEach(async () => {
    repository = {
      create: jest.fn(),
    } as Partial<jest.Mocked<ClientRepository>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientUsecase,
        {
          provide: ClientRepository,
          useValue: repository,
        },
      ],
    }).compile();

    usecase = module.get<CreateClientUsecase>(CreateClientUsecase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.create with mapped data and return the client output', async () => {
      const input: CreateClientUsecaseInput = {
        full_name: 'Joao da Silva',
        contact: '11987654321',
        address: 'Rua A, 123',
        userId: 1,
      };

      const prismaCreateInput = {
        full_name: input.full_name,
        contact: input.contact,
        address: input.address,
        user_id: input.userId,
        status: true,
      };

      // Usando 'any' para o tipo, já que a importação de Client está falhando
      const createdPrismaClient: any = {
        id: 1,
        full_name: input.full_name,
        contact: input.contact,
        address: input.address,
        user_id: input.userId,
        status: true,
        created_at: new Date('2025-06-17T10:00:00Z'),
        updated_at: new Date('2025-06-17T10:00:00Z'),
      };

      const expectedOutput: CreateClientUsecaseOutput = {
        id: createdPrismaClient.id,
        full_name: createdPrismaClient.full_name,
        contact: createdPrismaClient.contact,
        address: createdPrismaClient.address,
        userId: createdPrismaClient.user_id,
        status: createdPrismaClient.status,
        created_at: createdPrismaClient.created_at,
        updated_at: createdPrismaClient.updated_at,
      };

      (repository.create as jest.Mock).mockResolvedValue(createdPrismaClient);

      const result = await usecase.execute(input);

      expect(repository.create).toHaveBeenCalledWith(prismaCreateInput);
      expect(result).toEqual(expectedOutput);
    });

    it('should throw an error if repository.create fails', async () => {
      const input: CreateClientUsecaseInput = {
        full_name: 'Erro Teste',
        contact: '12345',
        address: 'Rua Erro',
        userId: 99,
      };

      const error = new Error('Database connection failed');
      (repository.create as jest.Mock).mockRejectedValue(error);

      await expect(usecase.execute(input)).rejects.toThrow(error);
    });
  });
});
