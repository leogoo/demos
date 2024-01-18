import { Controller, Get, Inject, Res, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  test(
    @Headers('authorization') authorization: string,
    @Res({ passthrough: true }) response: Response
  ) {
    console.log("authorization", authorization);
    if (authorization) {
      try {
        const data = this.jwtService.verify(authorization);
        console.log(data); // { count: 1, iat: 1705570961, exp: 1705580961 }
      } catch (e) {
        // jwt expired
        // 校验错误包括过期和无效token
        console.log(e);
      }
    }
    return '234234';
  }

  @Get('login')
  login(@Res() res: Response): void {
    const newToken = this.jwtService.sign({
      count: 1,
    });
  
    res.setHeader('Authorization', newToken);
    // 如果直接是return nest会自动封装为一个响应对象并发送给客户端，这里需要使用response对象，不能直接return
    // 或者配置{ passthrough: true }
    res.send('hello');
  }
}
