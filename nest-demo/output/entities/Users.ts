import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users", { schema: "mydatabase" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;
}
