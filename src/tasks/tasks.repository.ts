import { Repository } from "typeorm";
import { Task } from "./dto/task.entity";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";

export class TasksRepository<T> extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }
}
