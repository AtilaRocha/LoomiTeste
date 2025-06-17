import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentApplication } from 'src/application/payments/payment.application';
import { RolesGuard } from '../../../../guard/roles.guard';
import { Roles } from '../../../../roles.decorator';
import { PaymentDtoInput } from '../dto/payment.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiBearerAuth('token')
@ApiTags('payment')
@Controller({ path: 'payments' })
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(
    @Inject(PaymentApplication)
    private readonly paymentApplication: PaymentApplication,
  ) {}

  @Post('process-payment')
  @UseGuards(RolesGuard)
  @Roles('client')
  @ApiOperation({ summary: 'Processar um pagamento' })
  @ApiBody({ type: PaymentDtoInput, required: true })
  @ApiResponse({
    status: 201,
    description: 'Pagamento processado com sucesso.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Token inválido ou ausente.',
  })
  async processPayment(
    @Req() req: Request,
    @Body() input: PaymentDtoInput,
  ): Promise<{ success: boolean; message: string }> {
    this.logger.log('--- [ROTA DE PAGAMENTO ALCANÇADA] ---');
    this.logger.debug(
      `Corpo da requisição recebido: ${JSON.stringify(input, null, 2)}`,
    );
    this.logger.debug(
      `Usuário autenticado na requisição: ${JSON.stringify(req['user'], null, 2)}`,
    );

    return this.paymentApplication.execute(input);
  }
}
