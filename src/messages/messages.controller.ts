import { Controller, Get, Post, UseGuards, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { createMessageDTO, IMessage } from './dto/messages.dto';
import { MessagesService } from './messages.service';
import unAuthResponse from '../constants/unauthorized';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Messages controller')
@ApiBearerAuth('JWT')
@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private messagesServise: MessagesService) {}

  @Get()
  @ApiOperation({ summary: 'gets all messages' })
  @ApiOkResponse({ type: [IMessage] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async getAllMessages(): Promise<IMessage[]> {
    return this.messagesServise.getAllMessages();
  }

  @Get(':id/author')
  @ApiOperation({ summary: 'gets all messages by author id' })
  @ApiOkResponse({ type: [IMessage] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async getMyMessages(@Param('id') id: number): Promise<IMessage[]> {
    return this.messagesServise.getMyMessages(id);
  }

  @Get(':id/recipient')
  @ApiOperation({ summary: 'gets all messages addressed to user id' })
  @ApiOkResponse({ type: [IMessage] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async getMessagesForMe(@Param('id') id: number): Promise<IMessage[]> {
    return this.messagesServise.getMessagesForMe(id);
  }

  @Post()
  @ApiOperation({ summary: 'creates message' })
  @ApiBody({ type: createMessageDTO })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async createMessage(
    @Body() createMessageDTO: createMessageDTO,
  ): Promise<void> {
    return this.messagesServise.createMessage(createMessageDTO);
  }
}
