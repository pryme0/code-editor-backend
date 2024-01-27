// folder.dto.ts

// folder.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';
import { CreateFolderDto } from 'src/dto';
import { UserService } from '../user/user.service';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    private readonly userService: UserService,
  ) {}

  async create(input: CreateFolderDto): Promise<Folder> {
    const user = await this.userService.findOne(input.userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    input['user'] = user;

    const folder = this.folderRepository.create(input);
    return await this.folderRepository.save(folder);
  }

  async findAll(userId: number): Promise<Folder[]> {
    return await this.folderRepository.find({
      where: { user: { id: userId } },
      relations: ['tabs'],
    });
  }

  async findOne(id: number): Promise<Folder> {
    const folder = await this.folderRepository.findOne({
      where: { id },
      relations: ['tabs','user'],
    });
    if (!folder) {
      throw new NotFoundException(`Folder with ID ${id} not found`);
    }
    return folder;
  }

  async update(id: number, updateFolderDto: CreateFolderDto): Promise<Folder> {
    const folder = await this.folderRepository.findOne({ where: { id } });
    if (!folder) {
      throw new NotFoundException(`Folder with ID ${id} not found`);
    }
    this.folderRepository.merge(folder, updateFolderDto);
    return await this.folderRepository.save(folder);
  }

  async remove(id: number): Promise<Folder> {
    const folder = await this.folderRepository.findOne({ where: { id } });
    if (!folder) {
      throw new NotFoundException(`Folder with ID ${id} not found`);
    }
    return await this.folderRepository.remove(folder);
  }
}
