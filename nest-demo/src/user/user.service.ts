import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IdCard } from 'src/entity/IdCard.entity';
import { Photo } from 'src/entity/photo.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(IdCard) private idCardRepository: Repository<IdCard>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);

    const photo1 = this.photoRepository.create({
      tag: '111'
    });
    photo1.user = newUser;
    this.photoRepository.save(photo1);

    const photo2 = this.photoRepository.create({
      tag: '2222'
    });
    photo2.user = newUser;
    this.photoRepository.save(photo2);



    return 'This action adds a new user';
  }

  findAll() {
    const data = this.usersRepository.find({});
    return data;
  }

  findOne(id: number) {
    const data = this.usersRepository.find({
      where: {
        id: id
      },
      relations: ['photos']
    });
    return data;
  }

  update(id: number) {
    console.log(id);
    this.usersRepository.save([
      {
        "id": id,
        "firstName": "test",
        "lastName": "test",
        "age": 1111
      }
    ])
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.usersRepository.delete([id]);
    return `This action removes a #${id} user`;
  }
}
