// folder.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Folder } from './folder.entity'; // Adjust the path accordingly
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), UserModule],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService],
})
export class FolderModule {}
