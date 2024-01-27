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
import { CreateFolderDto, FolderDto } from '../../dto';
import { GetUser, JwtGuard } from 'src/utils';
import { User } from '../user/user.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'path-to-your-jwt-auth-guard';

@ApiBearerAuth('JWT-TOKEN')
@ApiTags('Folders')
@Controller('folders')
// @UseGuards(JwtAuthGuard) // Use your JWT authentication guard here
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiCreatedResponse({
    status: 201,
    type: FolderDto,
    description: 'Creates a folder',
  })
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createFolderDto: CreateFolderDto): Promise<FolderDto> {
    return this.folderService.create(createFolderDto);
  }

  @ApiCreatedResponse({
    status: 201,
    type: FolderDto,
    description: 'Gets a single folder',
  })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FolderDto> {
    return this.folderService.findOne(id);
  }

  @ApiCreatedResponse({
    status: 201,
    type: [FolderDto],
    description: 'Gets multiple folder for particular user',
  })
  @UseGuards(JwtGuard)
  @UseGuards(JwtGuard)
  @Get()
  async findAll(@GetUser() user: User): Promise<FolderDto[]> {
    return this.folderService.findAll(user.id);
  }

  @ApiCreatedResponse({
    status: 201,
    type: FolderDto,
    description: 'Updates a folder',
  })
  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFolderDto: CreateFolderDto,
  ): Promise<FolderDto> {
    return this.folderService.update(id, updateFolderDto);
  }

  @ApiCreatedResponse({
    status: 201,
    type: FolderDto,
    description: 'Deletes a folder',
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<FolderDto> {
    return this.folderService.remove(id);
  }
}
