import { ApiProperty } from '@nestjs/swagger';
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
