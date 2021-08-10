import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from "typeorm";
import User from "./User"

@Entity("sessions")
@Unique(["userId", "token"])
export default class Sessions {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  token!: string;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;
}