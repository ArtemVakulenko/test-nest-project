import { IsInt, Length, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class createCommentDTO {
  @ApiProperty({ type: String })
  @Length(1, 100)
  content: string;

  @ApiProperty({ type: Number })
  @IsInt()
  userId: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  parentCommentId?: number;

  @ApiProperty({ type: Number })
  @IsInt()
  postId: number;
}
