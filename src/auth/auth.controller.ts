import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/sign-up")
  @HttpCode(201)
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.authService.signUp(authCredentialsDto);
  }

  @Post("/sign-in")
  @HttpCode(201)
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
