import { Injectable } from '@nestjs/common';

export interface PaymentUsecaseInput {
  amount: number;
}

export interface PaymentUsecaseOutput {
  success: boolean;
  message: string;
}

@Injectable()
export class PaymentUsecase {
  async execute(input: PaymentUsecaseInput): Promise<PaymentUsecaseOutput> {
    if (input.amount <= 0) {
      return { success: false, message: 'Payment processed successfully' };
    }

    return { success: true, message: 'Payment processed successfully' };
  }
}
