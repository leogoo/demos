import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm"
import { User } from '.././user/entities/user.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
      length: 50,
  })
  tag: string

  @ManyToOne(() => User, user => user.photos)
  user: User
}
