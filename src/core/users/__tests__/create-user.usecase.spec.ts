import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { UserRepository } from '../repository/user.repository';
import {
  CreateUserUsecaseInput,
  CreateUserUsecaseOutput,
} from '../interfaces/create.user.usecase.interface';
import { UserRole } from 'src/shared/user-role.enum';

describe('CreateUserUsecase', () => {
  let usecase: CreateUserUsecase;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUsecase,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<CreateUserUsecase>(CreateUserUsecase);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.create with correct input and return the result', async () => {
      const input: CreateUserUsecaseInput = {
        name: 'teste',
        email: 'teste@gmail.com',
        password: '12345678',
        type: UserRole.CLIENT,
      };
      const output: CreateUserUsecaseOutput = {
        id: 1,
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
