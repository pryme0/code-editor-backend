import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto, LoginUserResponse } from 'src/dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(input: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (userExists) {
      throw new BadRequestException('User already exist');
    }
    const user = this.userRepository.create(input);
    return await this.userRepository.save(user);
  }

  async login(input: LoginUserDto): Promise<LoginUserResponse> {
    const user = await this.userRepository.findOne({
      where: { email: input.email },
      relations: ['folders'],
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    // Compare Password
    const isMatchPassword = await bcrypt.compare(input.password, user.password);

    if (!isMatchPassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      {
        expiresIn: '1H',
      },
    );

    return { user, accessToken };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['folders'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
   return await this.userRepository.remove(user);
  }
}
