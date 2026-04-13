import { Group } from "src/group/group.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false })
    cause!: string;

    @Column({})
    value!: number;

    @ManyToOne(() => User, (user) => user.expensesPaid, { nullable: false })
    paidBy!: User;

    @ManyToOne(() => User, (user) => user.expensesToPay, { nullable: false })
    paidOn!: User;

    @ManyToOne(() => Group, (group) => group.expenses , { nullable: false })
    group!: Group;

    @Column({ nullable: false })
    createDate!: Date;


    // @ManyToOne(() => User, (user) => user.expenses)
    // user: User;

    // @ManyToOne(() => User, (user) => user.expenses)
    // user2: User;

    // @ManyToOne(() => Group, (group) => group.expenses)
    // group: Group;
}