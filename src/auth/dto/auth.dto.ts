import { Length, IsEmail } from 'class-validator';

export class loginDTO {
  @IsEmail()
  email: string;

  @Length(5, 25)
  password: string;
}
