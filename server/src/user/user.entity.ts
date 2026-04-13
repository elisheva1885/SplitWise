import { Expense } from "src/expense/expense.entity";
import { Group } from "src/group/group.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true, nullable: false })
    username!: string;

    @Column({ nullable: false })
    email!: string

    @Column({ nullable: false })
    password!: string;

    @OneToMany(() => Expense, (expense) => expense.paidBy)
    expensesPaid!: Expense[];

    @OneToMany(() => Expense, (expense) => expense.paidOn)
    expensesToPay!: Expense[];

    @ManyToMany(() => Group)
    groups!: Group[];

    @OneToMany(() => Group, (group) => group.owner)
    ownedGroups!: Group[];
}