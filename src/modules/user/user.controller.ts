// user.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  LoginUserDto,
  LoginUserResponse,
  UserDto,
} from '../../dto';
import { GetUser, JwtGuard } from 'src/utils';
import { User } from './user.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-TOKEN')
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    status: 201,
    type: UserDto,
    description: 'Create a new user.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @ApiCreatedResponse({
    status: 201,
    type: LoginUserResponse,
    description: 'Log a user in.',
  })
  @Post('/login')
  login(@Body() input: LoginUserDto): Promise<LoginUserResponse> {
    return this.userService.login(input);
  }

  @ApiCreatedResponse({
    status: 201,
    type: UserDto,
    description: 'gets current user.',
  })
  @UseGuards(JwtGuard)
  @Get('/me')
  public async getAuthUser(@GetUser() user: User): Promise<User> {
    return this.userService.findOne(user.id);
  }

  @ApiCreatedResponse({
    status: 201,
    type: UserDto,
    description: 'Find one user.',
  })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @ApiCreatedResponse({
    status: 201,
    type: [UserDto],
    description: 'gets multiple users.',
  })
  @UseGuards(JwtGuard)
  @Get()
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @ApiCreatedResponse({
    status: 201,
    type: UserDto,
    description: 'Updates current user.',
  })
  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiCreatedResponse({
    status: 201,
    type: UserDto,
    description: 'Deletes a user.',
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.remove(id);
  }
}
