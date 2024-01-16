> 各种demo集合的仓库，用于记录一些框架或第三方包的使用方式和注意点

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