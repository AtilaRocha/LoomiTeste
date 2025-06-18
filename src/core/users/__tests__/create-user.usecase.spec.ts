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
  let mockUserRepository: Partial<jest.Mocked<UserRepository>>;

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn(),
    } as Partial<jest.Mocked<UserRepository>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUsecase,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    usecase = module.get<CreateUserUsecase>(CreateUserUsecase);
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

      const mockCreatedUser: any = {
        id: 1,
        name: input.name,
        email: input.email,
        password: 'hashedpassword',
        type: input.type,
        email_verified: false,
        created_at: new Date('2025-06-17T10:00:00Z'),
        updated_at: new Date('2025-06-17T10:00:00Z'),
      };

      const expectedOutput: CreateUserUsecaseOutput = {
        id: mockCreatedUser.id,
        name: mockCreatedUser.name,
        email: mockCreatedUser.email,
        password: mockCreatedUser.password,
        type: mockCreatedUser.type,
        email_verified: mockCreatedUser.email_verified,
        created_at: mockCreatedUser.created_at,
        updated_at: mockCreatedUser.updated_at,
      };

      (mockUserRepository.create as jest.Mock).mockResolvedValue(
        mockCreatedUser,
      );

      const result = await usecase.execute(input);

      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: input.name,
          email: input.email,
          type: input.type,
        }),
      );
      expect(result).toEqual(expectedOutput);
    });

    it('should throw an error if repository.create fails', async () => {
      const input: CreateUserUsecaseInput = {
        name: 'Erro User',
        email: 'erro@gmail.com',
        password: 'pass',
        type: UserRole.CLIENT,
      };

      const error = new Error('Database connection failed');
      (mockUserRepository.create as jest.Mock).mockRejectedValue(error);

      await expect(usecase.execute(input)).rejects.toThrow(error);
      expect(mockUserRepository.create).toHaveBeenCalled();
    });
  });
});
