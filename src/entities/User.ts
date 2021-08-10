import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import Sessions from "./Sessions";

@Entity("users")
@Unique(["email"])
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ type: "timestamptz" })
  createdAt!: Date;

  @Column()
  hash!: string;

  @OneToMany(() => Sessions, (sessions) => sessions.userId)
  sessions!: Sessions[];
}
