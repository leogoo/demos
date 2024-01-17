> 各种demo集合的仓库，用于记录一些框架或第三方包的使用方式和注意点

### next
1. route
    1. 根据文件路径作为路由，每个文件夹下需要有一个page.tsx
    1. (xxx)一个带圆括号的文件夹不会被作为路由，但是可以将路由分组，作用是设置统一的layout。demo中路由是/test/b
    1. 动态参数
        - [id]方括号命名的文件夹会被识别为一个参数，/app/test/[id]/page.tsx会被匹配为/test/:id
        - Catch-all Segments, [...slug],/app/test/[...slug]/page.tsx可以匹配/test/a, /test/a/b, /test/a/b/c...
        - Optional Catch-all Segments, [[...slug]],和[...slug]的区别是可以匹配/test
    1. 动态路由匹配存在优先级，优先是精确的匹配
        - /test会被/test/page.tsx匹配
        - /test/a 会被/test/a/page.tsx匹配
        - /test/123213 会被/test/[id]/page.tsx匹配，参数是 {id: '123213' }
        - /test/12/324 会被/test/[...slug]/page.tsx匹配, 参数是{ slug: [ '12', '324' ] }
    1. route Handler, 其实就是定义一个接口
        - route.js和page.js不能同时出现在一个文件夹内

### node调试
1. 浏览器
    1. 执行脚本时命令`node --inspect-brk index.js`
    1. 谷歌浏览器打开`chrome://inspect/#devices`
1. vscode

### nest
1. cli
    - 安装: `npm i -g @nestjs/cli`
    - 创建项目：`nest new project-name`
    - 创建模块：`nest g module test`
    - 创建过滤文件：`nest g filter Logging --no-spec`
        - `--no-spec`表示不生成测试文件
        - 文件的路径是 src/Logging/Logging.filter.ts
1. 静态资源服务
    - 安装 `npm install --save @nestjs/serve-static`
    - 主模块配置:
        ```js
        import { Module } from '@nestjs/common';
        import { AppController } from './app.controller';
        import { AppService } from './app.service';
        import { PersonModule } from './person/person.module';
        import { ServeStaticModule } from '@nestjs/serve-static';
        import { join } from 'path';

        @Module({
          imports: [
            PersonModule,
            ServeStaticModule.forRoot({
              rootPath: join(__dirname, '..', 'public'),
            }),
          ],
          controllers: [AppController],
          providers: [AppService],
        })
        export class AppModule {}
        ```
    - 访问: `http://127.0.0.1:3000/public/index.html`
1. 接口参数处理
    - form-data
1. 装饰器
    - controller用@Controller装饰器表示该controller可注入到模块中
    - provider用@Injectable装饰器表示该provider可注入到模块中
    - module中用@Module注入controller，provider
        ```js
        @Module({
          imports: [], // 导入模块后可以使用对应的provider
          controllers: [AppController],
          providers: [AppService],
          exports: [], // 导出provider
        })
        ```
    -  @Inject 指定注入的token
    - @Optional 将依赖项申明为可选
        ```js
        import { Controller, Get, Inject, Optional } from '@nestjs/common';
        import { AppService } from './app.service';

        @Controller()
        export class AppController {
          constructor(
            private readonly appService: AppService,
            @Optional() // 如果没有注入test，test就是null
            @Inject('dependency')
            private readonly dependency: SomeDependency;
          ) {}
          
        }
        ```
    - @Global 将module声明为全局，即在其他模块中可以使用
        ```js
        @Global()
        @Module({
          controllers: [AaaController],
          providers: [AaaService],
          exports: [AaaService], // 需要导出的provider
        })
        export class AaaModule {}
        ```
    - @Catch 处理filter、pipe、interceptor、guard中异常
        ```js
        // person.controller.ts
        @Get()
        @UseFilters(LoggingFilter)
        findAll() {
          throw new HttpException('test', HttpStatus.BAD_REQUEST);
          return this.personService.findAll();
        }

        // LoggingFilter.filter.ts
        import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
        import { Response } from 'express';

        @Catch(HttpException)
        export class LoggingFilter<T> implements ExceptionFilter {
          catch(exception: HttpException, host: ArgumentsHost) {
            const response: Response = host.switchToHttp().getResponse();
            response.status(exception.getStatus()).json({
              msg: exception.message,
            });
          }
        }
        ```
    - 请求参数
    - @SetMetadata，设置元数据。三种元数据的读取参数不一致，功能应该没啥差别
        - 类, 在读取类上的元数据时，第二个参数应传递类的构造函数 `this.reflector.get<string>('meta1', PersonController)`
          ```js
          @Controller('person')
          @SetMetadata('meta1', '1111')
          export class PersonController {
            constructor(
              private readonly personService: PersonService,
              private readonly reflector: Reflector
            ) {}

            @Get()
            findAll() {
              const metadataValue = this.reflector.get<string>('meta1', PersonController);
              return this.personService.findAll();
            }
          }
          ```
        - 方法
        - 请求参数
    - @Headers获取请求头
        ```js
        @Get('header')
        getHeader(
          @Headers('Accept') accept: string,
          @Headers() headers: Record<string, any>
        ) {
          console.log(accept, headers);
          return '11111';
        }
        ```
    - @Session获取session
        ```js
        @Get('session')
        getSession(@Session() session: Record<string, any>) {
          session.visits = session.visits ? session.visits + 1 : 1;
          console.log(session);
          return '11111';
        }
        ```
    - @HostParam获取域名部分的参数
        ```js
        // 只有域名为host.0.0.1的形式才能访问
        @Controller({ host: ':host.0.0.1', path: 'creature' })
        export class CreatureController {
          constructor(private readonly creatureService: CreatureService) {}

          @Get('host')
          host(@HostParam('host') host) {
            return host;
          }
        }
        ```
    - @Req获取请求参数
        ```js
        @Get('req')
        req(@Req() req: Request) {
          console.log(req.method, req.url);
          return `${req.method} ${req.url}`;
        }
        ```
    - 自定义装饰器
      - 类装饰器
      - 方法装饰器
      - 参数装饰器
1. pipe，在参数传给handler之前对参数做一些验证和转换的class
    - ParseIntPipe, 参数不是int时，会抛出异常
      ```js
      @Get('pipe')
      pipe(@Query('age', ParseIntPipe) age): string {
        console.log(age);
        return age;
      }
      ```
    - ParseFloatPipe, 包含int
    - ParseBoolPipe
    - ParseArrayPipe
      ```js
      @Get('pipe')
      pipe(
        @Query('b', new ParseArrayPipe({
          separator: '...' // 默认分隔符是,
        }))
        b
      ): number {
        console.log(b);
        return b;
      }
      ```
    - ParseEnumPipe
    - ParseUUIDPipe
    - DefaultValuePipe, 需要安装`class-validator class-transformer`
      ```js
      // main.ts
      // 全局使用ValidationPipe
      app.useGlobalPipes(new ValidationPipe());

      // person.controller.ts
      @Post('pipe')
      @UsePipes(new ValidationPipe())
      postPipe(@Body() createPersonDto: CreatePersonDto) {
        console.log(createPersonDto);
        return '2222'
      }

      // person/dto/create-person.dto.ts
      import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
      export class CreatePersonDto {
        @IsString()
        @IsNotEmpty()
        name: string;

        @IsNumber()
        @IsNotEmpty()
        age: number;
      }
      ```
    - 
1. filter
1. middleware
1. guard
1. interceptor
1. 生命周期
    1. 初始化
        - bootstrapping start
        - onModuleInit: 递归所有module，先执行controller，provider的onModuleInit方法，然后执行module的onModuleInit方法
        - onApplicationBootstrap: 依次调用controller，provider的onApplicationBootstrap方法，然后执行module的onApplicationBootstrap
        - 监听网络端口
    - 应用销毁
        - onModuleDestroy： 先调用每个模块的controller、provider的onModuleDestroy 方法，然后调用Module的 onModuleDestroy方法
        - beforeApplicationShutdown： 再调用每个模块的controller、provider的beforeApplicationShutdown方法，然后调用Module的beforeApplicationShutdown方法
        - 停止监听网络端口
        - onApplicationShutdown：调用每个模块的controller、provider的onApplicationShutdown方法，然后调用Module的onApplicationShutdown 方法
1. 其他
    1. 全局模块
        ```js
        import { Module, Global } from '@nestjs/common';
        import { CreatureService } from './creature.service';
        import { CreatureController } from './creature.controller';

        @Global() // 声明为全局
        @Module({
          controllers: [CreatureController],
          providers: [CreatureService],
          exports: [CreatureService],
        })
        export class CreatureModule {}
        ```
    1. 会话session
        - 用于在不同请求间存储信息，即会话内不同接口共享信息
        - 简单示例
          ```js
          // main.ts
          import { NestFactory } from '@nestjs/core';
          import { AppModule } from './app.module';
          import * as session from 'express-session';

          async function bootstrap() {
            const app = await NestFactory.create(AppModule);
            app.use(
              session({
                secret: 'my-secret',
                resave: false, // false,只有在会话数据发生实际更改时才会被保存
                saveUninitialized: false, // false,只有在会话数据被修改之后，才会在客户端的 cookie 中设置会话cookie
              })
            ),
            await app.listen(3000);
          }

          // person.controller.ts
            @Get('session')
            getSession(@Session() session: Record<string, any>) {
              session.visits = session.visits ? session.visits + 1 : 1;
              console.log(session);
              /* Session {
                cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
                visits: 1
              } */
              return '11111';
            }
          ```
    1. 自定义装饰器
        - 类装饰器
        - 方法装饰器
        - 参数装饰器
    1. class-validator支持的验证方式
        - IsString
        - IsNotEmpty
        - IsNumber
        - IsBoolean
        - IsDate
        - IsEnum
        - Contains
        - IsEmail
        - IsFQDN
        - IsInt
        - Length
        - Max
        - Min

