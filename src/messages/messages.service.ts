import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/database/entities/Message.entity';
import { UserEntity } from 'src/database/entities/User.entity';
import { Repository } from 'typeorm';
import { createMessageDTO, IMessage } from './dto/messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messagesRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private UsersRepository: Repository<UserEntity>,
  ) {}

  async getAllMessages(): Promise<IMessage[]> {
    return this.messagesRepository.find({
      relations: ['author', 'recipient'],
    });
  }

  async getMyMessages(id: number): Promise<IMessage[]> {
    return this.messagesRepository.find({
      relations: ['author', 'recipient'],
      where: { author: { id } },
    });
  }

  async getMessagesForMe(id: number): Promise<IMessage[]> {
    return this.messagesRepository.find({
      relations: ['author', 'recipient'],
      where: { recipient: { id } },
    });
  }

  async createMessage(body: createMessageDTO): Promise<void> {
    const { authorId, recipientId, content } = body;
    const author = await this.UsersRepository.findOne({ id: authorId });
    const recipient = await this.UsersRepository.findOne({
      id: recipientId,
    });
    const message = await this.messagesRepository.create({ content });
    message.author = author;
    message.recipient = recipient;
    await this.messagesRepository.save(message);
  }
}
