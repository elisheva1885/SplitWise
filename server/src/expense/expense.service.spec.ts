// import { ExpenseService } from "./expense.service";
// import { GroupService } from "src/group/group.service";
// import { Test } from "@nestjs/testing";

import { ExpenseService } from "./expense.service";
import { Test } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { GroupService } from "src/group/group.service";

describe("ExpenseService", () => {
    let expenseService: ExpenseService;
    let groupService: GroupService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ExpenseService,
                {
                    provide: GroupService,
                    useValue: { findByIdWithRelations: jest.fn(), },
                },
            ]
        }).compile();
        expenseService = moduleRef.get(ExpenseService);
        groupService = moduleRef.get(GroupService);
    });
    describe("getOptimizedExpense", () => {
        it("should throw group not found", async () => {
            (groupService.findByIdWithRelations as jest.Mock).mockResolvedValue(null);
            await expect(
                expenseService.getGroupExpense(1, 1),
            ).rejects.toThrow(NotFoundException);
        });
        it("should return empty array when group has no expenses", async () => {
            // (groupService.findByIdWithRelations as jest.Mock).mockResolvedValue(null);
            // await expect(
            //     expenseService.getGroupExpense(1, 1),
            // ).rejects.toThrow(NotFoundException);
        });
         it("should return the same data for expense between two users", async () => {
    
        });
        it("should return the sum of expenses values for a few expense between two users", async () => {
    
        });
        it("should return the direct expense", async () => {
    
        });
         it("should return the direct expense", async () => {
    
        });
        it("should return the same expenses when simplify isnt possible", async () => {
    
        });
    });
});