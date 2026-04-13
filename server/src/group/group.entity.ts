import { Expense } from "src/expense/expense.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true, nullable: false })
    name!: string;

    @Column({})
    descriprion!: string

    // @Column({ nullable: false })
    // owner: User;

    @ManyToOne(() => User, (user) => user.ownedGroups, { nullable: false })
    owner!: User;

    @ManyToMany(() => User)
    @JoinTable()
    members!: User[];

    @OneToMany(() => Expense, (expense) => expense.group, { cascade: true })
    expenses!: Expense[];

}