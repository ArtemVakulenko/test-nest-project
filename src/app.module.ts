import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [UsersModule, DatabaseModule, CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
