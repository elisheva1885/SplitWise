import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { UserModule } from 'src/user/user.module';
import { ExpenseModule } from 'src/expense/expense.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UserModule, ExpenseModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
