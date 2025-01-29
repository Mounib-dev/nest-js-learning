import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
