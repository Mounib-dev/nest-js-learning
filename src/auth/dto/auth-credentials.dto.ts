import {
  IsString,
  Matches,
  MaxLength,
  minLength,
  MinLength,
} from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "password must contain at least 1 upper case letter, 1 lower case letter, at least 1 number or special character",
  })
  password: string;
}
