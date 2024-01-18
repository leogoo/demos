import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Photo } from "../../entity/photo.entity";

@Entity("user", { schema: "mydatabase" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "firstName", length: 255 })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 255 })
  lastName: string;

  @Column("int", { name: "age" })
  age: number;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[]
}
