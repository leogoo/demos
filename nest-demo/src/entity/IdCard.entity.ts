import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm"
import { User } from '.././user/entities/user.entity';

@Entity({
    name: 'id_card'
})
export class IdCard {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50,
        comment: '身份证号'
    })
    cardName: string

    @JoinColumn()
    @OneToOne(() => User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    user: User
}