import { Controller, Get, Post, Body, Patch, Param, Delete, HostParam, Req, Request } from '@nestjs/common';
import { CreatureService } from './creature.service';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';

@Controller({ host: ':host.0.0.1', path: 'creature' })
export class CreatureController {
  constructor(private readonly creatureService: CreatureService) {}

  @Get('host')
  host(@HostParam('host') host) {
    return host;
  }

  @Get('req')
  req(@Req() req: Request) {
    console.log(req.method, req.url);
    return `${req.method} ${req.url}`;
  }

  @Post()
  create(@Body() createCreatureDto: CreateCreatureDto) {
    return this.creatureService.create(createCreatureDto);
  }

  @Get()
  findAll() {
    return this.creatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatureDto: UpdateCreatureDto) {
    return this.creatureService.update(+id, updateCreatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creatureService.remove(+id);
  }
}
