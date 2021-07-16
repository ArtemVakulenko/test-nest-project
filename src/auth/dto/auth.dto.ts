import { Length, IsEmail } from 'class-validator';

export class loginDTO {
  @IsEmail()
  email: string;

  @Length(5, 25)
  userName: string;

  @Length(5, 25)
  password: string;
}

export class regDTO {
  @IsEmail()
  email: string;

  @Length(5, 25)
  userName: string;

  @Length(5, 25)
  password: string;
}
