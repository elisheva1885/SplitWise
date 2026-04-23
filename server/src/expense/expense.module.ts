// import { forwardRef, Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { Expense } from "./expense.entity";
// import { UserModule } from "src/user/user.module";
// import { GroupModule } from "src/group/group.module";
// import { ExpenseController } from "./expense.controller";
// import { JwtService } from "@nestjs/jwt";
// import { ExpenseService } from "./expense.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Expense } from "./expense.entity";
import { ExpenseService } from "./expense.service";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ExpenseController } from "./expense.controller";
import { UserModule } from "src/user/user.module";
import { GroupModule } from "src/group/group.module";


@Module({
    imports: [TypeOrmModule.forFeature([Expense]),UserModule, GroupModule],
    controllers: [ExpenseController],
    providers: [ExpenseService],
    exports: [ExpenseService],
})
export class ExpenseModule {}



