import { ApiProperty } from '@nestjs/swagger';
import { FolderDto } from './folder.dto';

export class CreateUserDto {
  @ApiProperty({ description: 'Users name' })
  name: string;
  @ApiProperty({ description: 'email' })
  email: string;
  @ApiProperty({ description: 'password' })
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ description: 'email' })
  email: string;
  @ApiProperty({ description: 'Password' })
  password: string;
}

export class UserDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'name' })
  name: string;

  @ApiProperty({ description: 'email' })
  email: string;

  @ApiProperty({
    description: 'Users name',
    type: () => [FolderDto],
  })
  folders: FolderDto[];
}

export class LoginUserResponse {
  @ApiProperty({ description: 'user', type: () => UserDto })
  user: UserDto;

  @ApiProperty({ description: 'accessToken' })
  accessToken: string;
}
