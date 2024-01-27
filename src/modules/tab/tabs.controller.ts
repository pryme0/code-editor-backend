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
import { TabService } from './tab.service';
import { CreateTabDto } from '../../dto';
import { JwtGuard } from 'src/utils';

@Controller('tabs')
export class TabController {
  constructor(private readonly tabService: TabService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createTabDto: CreateTabDto) {
    return this.tabService.create(createTabDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tabService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Get('folder/:folderId')
  findAll(@Param('folderId', ParseIntPipe) folderId: number) {
    return this.tabService.findAll(folderId);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTabDto: CreateTabDto,
  ) {
    return this.tabService.update(id, updateTabDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tabService.remove(id);
  }
}
