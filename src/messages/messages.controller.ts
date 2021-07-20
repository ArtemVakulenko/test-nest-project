import { Controller, Get, Post, UseGuards, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createMessageDTO, IMessage } from './dto/messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private messagesServise: MessagesService) {}

  @Get()
  async getAllMessages(): Promise<IMessage[]> {
    return this.messagesServise.getAllMessages();
  }

  @Get(':id/author')
  async getMyMessages(@Param('id') id: number): Promise<IMessage[]> {
    return this.messagesServise.getMyMessages(id);
  }
  @Get(':id/recipient')
  async getMessagesForMe(@Param('id') id: number): Promise<IMessage[]> {
    return this.messagesServise.getMessagesForMe(id);
  }

  @Post()
  async createMessage(
    @Body() createMessageDTO: createMessageDTO,
  ): Promise<void> {
    return this.messagesServise.createMessage(createMessageDTO);
  }
}
