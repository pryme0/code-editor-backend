import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface, JwtOptions } from './jwt.interface';

@Injectable()
export class JwtEncryptionService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: JwtPayloadInterface, options?: JwtOptions) {
    const token = await this.jwtService.sign(payload, {
      expiresIn: options?.expiresIn || '1H',
    });
    return token;
  }

  async decodeToken(token: string): Promise<any> {
    return await this.jwtService.decode(token);
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      console.log(error);
      throw { message: error.message, status: 401 };
    }
  }

  async createAccessTokens(payload: JwtPayloadInterface, options?: JwtOptions) {
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: options?.expiresIn || '1H',
    });

    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: options?.refreshIn || '3D',
    });

    return { accessToken, refreshToken };
  }
}
