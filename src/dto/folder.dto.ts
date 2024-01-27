import { ApiProperty } from '@nestjs/swagger';
import { TabDto } from './tabs.dto';
import { UserDto } from './user.dto';

export class CreateFolderDto {
  @ApiProperty({ description: 'name' })
  name: string;

  @ApiProperty({ description: 'userId' })
  userId: number;
}

export class FolderDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'name' })
  name: string;

  @ApiProperty({ description: 'user', type: () => UserDto })
  user: UserDto;

  @ApiProperty({ description: 'tabs', type: () => [TabDto] })
  tabs: TabDto[];
}
