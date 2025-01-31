import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepisotory: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "superSecret!",
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepisotory.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
