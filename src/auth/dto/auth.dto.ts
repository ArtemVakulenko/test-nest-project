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

export class googleLoginDTO {
  @IsEmail()
  email: string;

  provider: string;
}

export class facebookLoginDTO {
  @IsEmail()
  email: string;

  provider: string;
}
