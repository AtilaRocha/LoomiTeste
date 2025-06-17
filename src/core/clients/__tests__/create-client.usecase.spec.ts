import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientUsecase } from 'src/core/clients/usecases/create-client.usecase';
import { ClientRepository } from 'src/core/clients/repository/client.repository';
import {
  CreateClientUsecaseInput,
  CreateClientUsecaseOutput,
} from 'src/core/clients/interfaces/create.client.usecase.interface';

describe('CreateClientUsecase', () => {
  let usecase: CreateClientUsecase;
  let repository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientUsecase,
        {
          provide: ClientRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<CreateClientUsecase>(CreateClientUsecase);
    repository = module.get<ClientRepository>(ClientRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.create with correct input and return the result', async () => {
      const input: CreateClientUsecaseInput = {
        full_name: 'Joao',
        contact: '1',
        address: 'caminho da paz 11',
        userId: 1,
      };
      const output: CreateClientUsecaseOutput = {
        id: 1,
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        ...input,
      };

      jest.spyOn(repository, 'create').mockResolvedValue(output as any);

      const result = await usecase.execute(input);

      expect(repository.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(output);
    });
  });
});
