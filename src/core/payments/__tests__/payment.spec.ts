import { Test, TestingModule } from '@nestjs/testing';
import { PaymentUsecase } from '../usecases/payment.usecase';

describe('PaymentUsecase', () => {
  let usecase: PaymentUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentUsecase],
    }).compile();

    usecase = module.get<PaymentUsecase>(PaymentUsecase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should return success false and appropriate message if amount is less than or equal to 0', async () => {
      const input = { amount: 0 };
      const expectedOutput = {
        success: false,
        message: 'Payment processed successfully',
      };

      const result = await usecase.execute(input);

      expect(result).toEqual(expectedOutput);
    });

    it('should return success true and appropriate message if amount is greater than 0', async () => {
      const input = { amount: 100 };
      const expectedOutput = {
        success: true,
        message: 'Payment processed successfully',
      };

      const result = await usecase.execute(input);

      expect(result).toEqual(expectedOutput);
    });
  });
});
