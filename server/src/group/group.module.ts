import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { UserModule } from 'src/user/user.module';
import { ExpenseModule } from 'src/expense/expense.module';

@Module({
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([Group]), UserModule, ExpenseModule],
=======
  imports: [TypeOrmModule.forFeature([Group]), forwardRef(() => UserModule)],
>>>>>>> dev
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
