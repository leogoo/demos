import { Controller, Get, Post, Query, Body, Patch, Param, Delete, UseFilters, HttpException, HttpStatus, SetMetadata, Headers, Session, ParseIntPipe, ParseFloatPipe, ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CreatureService } from '../creature/creature.service';
import { LoggingFilter } from 'src/logging/logging.filter';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';


@Controller('person')
@SetMetadata('meta1', '1111')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly creatureService: CreatureService,
    private readonly reflector: Reflector
  ) {}

  @Get('pipe')
  pipe(
    @Query('b', new ParseArrayPipe({
      separator: '...'
    }))
    b
  ): number {
    console.log(b);
    return b;
  }

  @Post('pipe')
  @UsePipes(new ValidationPipe())
  postPipe(@Body() createPersonDto: CreatePersonDto) {
    console.log(createPersonDto);
    return '2222'
  }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @UseFilters(LoggingFilter)
  findAll() {
    const metadataValue = this.reflector.get<string>('meta1', PersonController);
    throw new HttpException('xxx', HttpStatus.BAD_REQUEST);
    return this.personService.findAll();
  }

  @Get('header')
  getHeader(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, any>
  ) {
    console.log(accept, headers);
    return '11111';
  }

  @Get('session')
  getSession(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    console.log(session);
    return '11111';
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('name') name: string) {
    // return this.personService.findOne(+id);
    return this.creatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
