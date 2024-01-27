import { TabDto } from './tabs.dto';
import { UserDto } from './user.dto';

export class CreateFolderDto {
  name: string;
  userId: number;
}

export class FolderDto {
  id: number;

  name: string;

  user: UserDto;

  tabs: TabDto[];
}
