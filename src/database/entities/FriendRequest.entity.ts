import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column()
  recipientId: number;

  @Column()
  status: boolean;
}
