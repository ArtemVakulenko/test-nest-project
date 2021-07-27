import { IsInt, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createPostDTO {
  @ApiProperty({ type: Number })
  @IsInt()
  userId: number;

  @ApiProperty({ type: String })
  @Length(1, 100)
  content: string;
}
