import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("/tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  @HttpCode(201)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
