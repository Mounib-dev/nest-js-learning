import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.model";

@Controller("/tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  @HttpCode(201)
  createTask(
    @Body("title") title: string,
    @Body("description") description: string,
  ) {
    return this.tasksService.createTask(title, description);
  }
}
