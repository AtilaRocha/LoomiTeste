import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { IUsuarioRepository } from '../../domain/repositories/usuario.repository.interface';

// 1. Criamos um "dublê" do nosso repositório
const mockUsuarioRepository = {
  create: jest.fn().mockImplementation((dto) =>
    Promise.resolve({
      id: 'algum-uuid',
      ...dto,
    }),
  ),
  // Adicione outros métodos que o service usa
};

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        // 2. Injeção de Dependência Falsa (Injeção de Mock)
        // Quando o Nest tentar injetar o IUsuarioRepository, ele receberá nosso dublê
        {
          provide: 'IUsuarioRepository', // O token da injeção
          useValue: mockUsuarioRepository, // O nosso objeto falso
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um usuário com sucesso', async () => {
    const dto = { nome: 'Atila', email: 'atila@teste.com', senha: '123' };
    const usuarioCriado = await service.create(dto);

    // 3. Verificamos se o service chamou o método 'create' do nosso repositório
    expect(mockUsuarioRepository.create).toHaveBeenCalledWith(dto);

    // Verificamos se o resultado está correto
    expect(usuarioCriado).toEqual({
      id: expect.any(String),
      nome: 'Atila',
      email: 'atila@teste.com',
      senha: '123',
    });
  });
});
