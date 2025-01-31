import { DataSource, Repository } from "typeorm";
import { Task } from "./dto/task.entity";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Injectable } from "@nestjs/common";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterdto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterdto;

    const query = this.createQueryBuilder("task");

    // Status filter
    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    // Search filter
    if (search) {
      query.andWhere(
        "LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)",
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);

    return task;
  }
}
