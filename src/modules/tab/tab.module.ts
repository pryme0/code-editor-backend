// tab.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TabController } from './tabs.controller';
import { TabService } from './tab.service';
import { Tab } from './tab.entity'; // Adjust the path accordingly
import { FolderModule } from '../folder/folder.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tab]), FolderModule],
  controllers: [TabController],
  providers: [TabService],
})
export class TabModule {}
