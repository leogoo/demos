import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MyClassDecorator } from 'src/my-class-decorator/my-class-decorator.decorator';
import { Reflector } from '@nestjs/core';
import { CustomClass } from 'src/custom-class/custom-class.decorator';
import { Handler} from 'src/handler/handler.decorator';
import { CustomQueryParam } from 'src/param/param.decorator';

@MyClassDecorator('22222')
@CustomClass('111111')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector
  ) {}

  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@CustomQueryParam('123') customParam: string) {
    console.log(customParam);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const metadataValue = Reflect.getMetadata('meta-a', UserController);
    const metadataValue2 = this.reflector.get<string>('meta-b', UserController);
    console.log("metadataValue", metadataValue, metadataValue2)

    return this.userService.findOne(+id);
  }

  @Post('update')
  update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
