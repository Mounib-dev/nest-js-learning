import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../tasks-status.enum";

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
}
