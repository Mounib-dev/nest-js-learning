import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks-status.enum";
import { User } from "src/auth/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(10, 50)
  title: string;

  @Column()
  @Length(20, 255)
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
