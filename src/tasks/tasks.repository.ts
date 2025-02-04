import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "./../auth/user.entity";

@Injectable()
export class TasksRepository extends Repository<Task> {
  private logger = new Logger("TasksRepository", { timestamp: true });
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterdto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterdto;

    const query = this.createQueryBuilder("task");
    query.where({ user });

    // Status filter
    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    // Search filter
    if (search) {
      query.andWhere(
        "(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))",
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterdto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
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
