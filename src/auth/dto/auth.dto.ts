import { Length, IsEmail, IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDTO {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @Length(5, 25)
  userName: string;

  @ApiProperty({ type: String })
  @Length(5, 25)
  password: string;
}

export class regDTO {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @Length(5, 25)
  userName: string;

  @ApiProperty({ type: String })
  @Length(5, 25)
  password: string;
}

export class googleLoginDTO {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  provider: string;
}

export class facebookLoginDTO {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  provider: string;
}

export class loginAnswerDTO {
  @ApiProperty({ type: String })
  token: string;
}
