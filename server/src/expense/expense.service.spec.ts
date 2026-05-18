// import { ExpenseService } from "./expense.service";
// import { GroupService } from "src/group/group.service";
// import { Test } from "@nestjs/testing";

import { GroupService } from "src/group/group.service";
import { ExpenseService } from "./expense.service";
import { Test } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";

// describe('ExpenseService', () => {
//     let expenseService: ExpenseService;
//     let groupService: GroupService;
//     beforeEach(async () => {
//         const moduleRef = await Test.createTestingModule({
//             providers: [ExpenseService, GroupService],
//         }).compile();

//         expenseService = moduleRef.get(ExpenseService);
//         groupService = moduleRef.get(GroupService);
//     });
//     describe('getOptimizedExpense', () => {
//         it('should throw group not found', async () => {
//             const result = ['test'];
//             jest.spyOn(groupService, 'findByIdWithRelations')(() => result);
//             expect(await catsController.findAll()).toBe(result);

//         })
//     })
// })

describe("ExpenseService", () => {
    let expenseService: ExpenseService;
    let groupService: GroupService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ExpenseService,
                GroupService,
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
    });
});