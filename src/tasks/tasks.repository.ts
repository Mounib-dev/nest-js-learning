import { EntityManager, Repository } from "typeorm";
import { Task } from "./dto/task.entity";

export class TasksRepository extends Repository<Task> {}
