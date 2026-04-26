import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';
import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { UserModule } from 'src/user/user.module';
import { GroupModule } from 'src/group/group.module';
import { ExpenseValidator } from './expense.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), UserModule, GroupModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseValidator],
  exports: [ExpenseService],
})
export class ExpenseModule {}
