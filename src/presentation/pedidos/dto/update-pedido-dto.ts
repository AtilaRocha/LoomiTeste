import { IsEnum, IsNotEmpty } from 'class-validator';

export enum StatusPedido {
  Recebido = 'Recebido',
  EmPreparacao = 'Em preparação',
  Despachado = 'Despachado',
  Entregue = 'Entregue',
}

export class UpdatePedidoStatusDto {
  @IsEnum(StatusPedido)
  @IsNotEmpty()
  status: StatusPedido;
}
