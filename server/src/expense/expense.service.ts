import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "./expense.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
@Injectable()
export class ExpenseService {
    constructor(
         @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>, 
    ) {     
    }

    
}