import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  uuid!: number;

  @Column({ nullable: true, default: null })
  cause?: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  value!: number;

  @ManyToOne(() => User, (user) => user.expensesPaid, { nullable: false })
  paidBy!: User;

  @ManyToOne(() => User, (user) => user.expensesToPay, { nullable: false })
  paidOn!: User;

  @ManyToOne(() => Group, (group) => group.expenses, { nullable: false })
  group!: Group;

  @CreateDateColumn()
  createDate!: Date;
}



