import { Expense } from 'src/expense/expense.entity';
import { Group } from 'src/group/group.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uuid!: number;

  @Column({ unique: true, nullable: false })
  username!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  // @Column({ nullable: false, select: false })
  @Column({ nullable: false })
  password!: string;

  @OneToMany(() => Expense, (expense) => expense.paidBy)
  expensesPaid!: Expense[];

  @OneToMany(() => Expense, (expense) => expense.paidOn)
  expensesToPay!: Expense[];

  @ManyToMany(() => Group, (group) => group.members)
  groups!: Group[];

  @OneToMany(() => Group, (group) => group.owner)
  ownedGroups!: Group[];
}
