// folder.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from '../../dto';
import { GetUser, JwtGuard } from 'src/utils';
import { User } from '../user/user.entity';
// import { JwtAuthGuard } from 'path-to-your-jwt-auth-guard';

@Controller('folders')
// @UseGuards(JwtAuthGuard) // Use your JWT authentication guard here
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(createFolderDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.folderService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetUser() user: User) {
    return this.folderService.findAll(user.id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFolderDto: CreateFolderDto,
  ) {
    return this.folderService.update(id, updateFolderDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.folderService.remove(id);
  }
}
