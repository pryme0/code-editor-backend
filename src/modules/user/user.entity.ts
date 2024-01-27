import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Folder } from '../folder/folder.entity';
import * as bcrypt from 'bcryptjs';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Folder, (folder) => folder.user)
  folders: Folder[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(12);

    this.password = bcrypt.hashSync(password || this.password, salt);
  }
}
