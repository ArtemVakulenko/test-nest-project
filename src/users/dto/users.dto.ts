import { IsEmail, IsInt, Length } from 'class-validator';

export class postUserDTO {
  @Length(5, 25)
  userName?: string;

  @Length(5, 25)
  password?: string;

  @IsEmail()
  email: string;
}

export class putUserDTO {
  @IsInt()
  id: number;

  @Length(5, 25)
  userName: string;

  @Length(5, 25)
  password: string;
}
