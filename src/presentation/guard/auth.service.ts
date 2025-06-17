import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: {
    id: number;
    email: string;
    type: string;
    client: any;
  }) {
    return this.jwtService.sign({ user: payload });
  }

  async checkToken(token: string): Promise<{ user: any } | null> {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (err) {
      return null;
    }
  }
}
