import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infra/auth/guards/jwt-auth.guard';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ClientesService } from '../../application/clientes/clientes.service';
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createClienteDto: CreateClienteDto, @Req() req: any) {
    const usuarioId = req.user.id;

    return this.clientesService.create(createClienteDto, usuarioId);
  }
}
