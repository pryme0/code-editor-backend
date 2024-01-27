import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Folder } from '../folder/folder.entity';

@Entity()
export class Tab {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  extension: string;

  @Column({ type: 'text' })
  language: string;

  @Column({ type: 'int' })
  languageId: number;

  @ManyToOne(() => Folder, (folder) => folder.tabs)
  folder: Folder;
}
