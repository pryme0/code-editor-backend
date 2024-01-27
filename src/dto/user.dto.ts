import { FolderDto } from "./folder.dto";

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class UserDto {
  id: number;

  name: string;

  email: string;

  password: string;

  folders: FolderDto[];
}

export class LoginUserResponse {
  user: UserDto;
  accessToken: string;
}
