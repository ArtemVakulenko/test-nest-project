import { IUser } from '../../users/dto/users.dto';
import { IsInt, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IMessage {
  @ApiProperty()
  author: IUser;

  @ApiProperty()
  recipient: IUser;

  @ApiProperty({ type: String })
  content: string;
}

export class createMessageDTO {
  @ApiProperty({ type: Number })
  @IsInt()
  authorId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  recipientId: number;

  @ApiProperty({ type: String })
  @Length(5, 25)
  content: string;
}
