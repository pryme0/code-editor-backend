import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tab } from './tab.entity';
import { CreateTabDto } from 'src/dto';
import { FolderService } from '../folder/folder.service';

@Injectable()
export class TabService {
  constructor(
    @InjectRepository(Tab)
    private readonly tabRepository: Repository<Tab>,
    private readonly folderService: FolderService,
  ) {}

  async create(input: CreateTabDto): Promise<Tab> {
    const folder = await this.folderService.findOne(input.folderId);
    if (!folder) {
      throw new BadRequestException('Folder not found');
    }
    input['folder'] = folder;
    const tab = this.tabRepository.create(input);
    return await this.tabRepository.save(tab);
  }

  async findAll(folderId: number): Promise<Tab[]> {
    return await this.tabRepository.find({
      where: { folder: { id: folderId } },
    });
  }

  async findOne(id: number): Promise<Tab> {
    const tab = await this.tabRepository.findOne({ where: { id } });
    if (!tab) {
      throw new NotFoundException(`Tab with ID ${id} not found`);
    }
    return tab;
  }

  async update(id: number, updateTabDto: CreateTabDto): Promise<Tab> {
    const tab = await this.tabRepository.findOne({ where: { id } });
    if (!tab) {
      throw new NotFoundException(`Tab with ID ${id} not found`);
    }
    this.tabRepository.merge(tab, updateTabDto);
    return await this.tabRepository.save(tab);
  }

  async remove(id: number): Promise<Tab> {
    const tab = await this.tabRepository.findOne({ where: { id } });
    if (!tab) {
      throw new NotFoundException(`Tab with ID ${id} not found`);
    }
    return await this.tabRepository.remove(tab);
  }
}
