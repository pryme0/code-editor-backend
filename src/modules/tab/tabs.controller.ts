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
import { CreateTabDto, TabDto } from '../../dto';
import { JwtGuard } from 'src/utils';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-TOKEN')
@ApiTags('Tabs')
@Controller('tabs')
export class TabController {
  constructor(private readonly tabService: TabService) {}

  @ApiCreatedResponse({
    status: 201,
    type: TabDto,
    description: 'Creates a tab',
  })
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createTabDto: CreateTabDto): Promise<TabDto> {
    return this.tabService.create(createTabDto);
  }

  @ApiCreatedResponse({
    status: 201,
    type: TabDto,
    description: 'Gets a single tab',
  })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TabDto> {
    return this.tabService.findOne(id);
  }

  @ApiCreatedResponse({
    status: 201,
    type: [TabDto],
    description: 'Gets tabs for a particular folder',
  })
  @UseGuards(JwtGuard)
  @Get('folder/:folderId')
  findAll(
    @Param('folderId', ParseIntPipe) folderId: number,
  ): Promise<TabDto[]> {
    return this.tabService.findAll(folderId);
  }

  @ApiCreatedResponse({
    status: 201,
    type: TabDto,
    description: 'Updates a tab',
  })
  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTabDto: CreateTabDto,
  ): Promise<TabDto> {
    return this.tabService.update(id, updateTabDto);
  }

  @ApiCreatedResponse({
    status: 201,
    type: TabDto,
    description: 'Deletes a tab',
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tabService.remove(id);
  }
}
