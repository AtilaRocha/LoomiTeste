import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infra/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('produtos')
export class ProdutosController {}
