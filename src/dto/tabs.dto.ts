import { FolderDto } from './folder.dto';

export class CreateTabDto {
  name: string;
  content: string;
  language: string;
  extension : string;
  languageId: number;
  folderId: number;
}

export class TabDto {
  id: number;

  name: string;

  content: string;

  language: string;

  languageId: number;

  extension: string;

  folder: FolderDto;
}
