import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TasksRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { User } from "./../auth/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {
        id: id,
        user: user,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
