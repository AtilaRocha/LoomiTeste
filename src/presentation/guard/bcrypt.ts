import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  constructor(@Inject('bcrypt') private readonly bcrt: typeof bcrypt) {}

  /**
   * Criptografa um dado (senha).
   * @param data O dado em texto puro a ser criptografado.
   * @returns Uma string com o hash.
   */
  async hash(data: string): Promise<string> {
    const salt = await this.bcrt.genSalt(10);
    return this.bcrt.hash(data, salt);
  }

  /**
   * Compara um dado em texto puro com um hash.
   * @param data O dado em texto puro (ex: a senha que o usuário digitou no login).
   * @param encrypted O hash que está salvo no banco de dados.
   * @returns True se a senha corresponder ao hash, senão false.
   */
  async compare(data: string, encrypted: string): Promise<boolean> {
    return this.bcrt.compare(data, encrypted);
  }
}
