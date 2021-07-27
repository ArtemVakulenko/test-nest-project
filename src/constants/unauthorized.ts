import { ApiProperty } from '@nestjs/swagger';

class unAuthResponse {
  @ApiProperty({ type: Number })
  status: number;
  @ApiProperty({ type: String })
  message: string;
}

export default unAuthResponse;
