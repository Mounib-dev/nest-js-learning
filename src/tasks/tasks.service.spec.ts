import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";
import { TaskStatus } from "./tasks-status.enum";

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: "Mounib",
  id: "1",
  password: "testPassword",
  tasks: [],
};

describe("TasksService", () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe("getTasks", () => {
    it("calls TasksRepository.getTasks and returns the result", async () => {
      tasksRepository.getTasks.mockResolvedValue("someValue");
      const result = await tasksService.getTasks({}, mockUser);
      expect(result).toEqual("someValue");
    });
  });

  describe("getTaskById", () => {
    it("calls TasksRepository.getTaskById and returns the result", async () => {
      const mockTask = {
        title: "Test title",
        description: "Test description",
        id: "someId",
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById("id", mockUser);
      expect(result).toEqual(mockTask);
    });

    it("calls TasksRepository.getTaskById and handles an error", async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById("id", mockUser)).rejects.toThrow(
        'Task with ID "id" not found',
      );
    });
  });
});
