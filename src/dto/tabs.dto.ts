import { ApiProperty } from '@nestjs/swagger';
import { FolderDto } from './folder.dto';

export class CreateTabDto {
  @ApiProperty({ description: 'name' })
  name: string;

  @ApiProperty({ description: 'content' })
  content: string;

  @ApiProperty({ description: 'language' })
  language: string;

  @ApiProperty({ description: 'extension' })
  extension: string;

  @ApiProperty({ description: 'languageId' })
  languageId: number;

  @ApiProperty({ description: 'folderId' })
  folderId: number;
}

export class TabDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'name' })
  name: string;

  @ApiProperty({ description: 'content' })
  content: string;

  @ApiProperty({ description: 'language' })
  language: string;

  @ApiProperty({ description: 'languageId' })
  languageId: number;

  @ApiProperty({ description: 'extension' })
  extension: string;

  @ApiProperty({ description: 'folder', type: () => FolderDto })
  folder: FolderDto;
}
