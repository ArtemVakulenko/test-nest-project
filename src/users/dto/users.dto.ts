import { IsEmail, IsInt, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class postUserDTO {
  @ApiProperty({ type: String })
  @Length(5, 25)
  userName?: string;

  @ApiProperty({ type: String })
  @Length(5, 25)
  password?: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;
}

export class putUserDTO {
  @ApiProperty({ type: Number })
  @IsInt()
  id: number;

  @ApiProperty({ type: String })
  @Length(5, 25)
  userName: string;

  @ApiProperty({ type: String })
  @Length(5, 25)
  password: string;
}

export class IUser {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  userName: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  avatar: string;
}
