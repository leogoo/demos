1. 利用dockerfile构建docker镜像
```zsh
docker build -t mymysql .
```
2. 创建容器
```zsh
docker run -d --name mymysql-container -p 3306:3306 mymysql
```