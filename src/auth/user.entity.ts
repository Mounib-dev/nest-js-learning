import { Min } from "class-validator";
import { Task } from "src/tasks/dto/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  @Min(6)
  password: string;

  // type is the type of the property, second argument is how we access it from the task entity, eager true means when fetching a user, we get his tasks too
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
