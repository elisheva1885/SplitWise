import { ExpenseService } from './expense.service';
import { Test } from '@nestjs/testing';
import { GroupService } from 'src/group/group.service';
import { ExpenseValidator } from './expense.validator';
import { UserService } from 'src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Expense } from './expense.entity';

describe('ExpenseService', () => {
  let expenseService: ExpenseService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: GroupService,
          useValue: {},
        },
        {
          provide: ExpenseValidator,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Expense),
          useValue: {},
        },
      ],
    }).compile();
    expenseService = moduleRef.get(ExpenseService);
  });
  describe('simplifyDebts', () => {
    it('should simplify simple chain debt A -> B -> C into A -> C', () => {
      const matrix = [
        [0, 100, 0],
        [0, 0, 100],
        [0, 0, 0],
      ];
      const result = expenseService.simplifyDebts(matrix);
      const expectedMatrix = [
        [0, 0, 100],
        [0, 0, 0],
        [0, 0, 0],
      ];
      expect(result).toEqual(expectedMatrix);
    });
    it('should partially simplify when middle debt is smaller', () => {
      const matrix = [
        [0, 100, 0],
        [0, 0, 40],
        [0, 0, 0],
      ];
      const result = expenseService.simplifyDebts(matrix);
      const expectedMatrix = [
        [0, 60, 40],
        [0, 0, 0],
        [0, 0, 0],
      ];
      expect(result).toEqual(expectedMatrix);
    });
    it('should simplify circular debts correctly', () => {
      const matrix = [
        [0, 100, 0],
        [0, 0, 100],
        [100, 0, 0],
      ];
      const result = expenseService.simplifyDebts(matrix);
      const expectedMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      expect(result).toEqual(expectedMatrix);
    });
    it('should not create self debts', () => {
      const matrix = [
        [0, 100, 0],
        [20, 0, 100],
        [50, 0, 0],
      ];

      const result = expenseService.simplifyDebts(matrix);
      let hasSelfDebt = false;
      result.forEach((row, i) => {
        hasSelfDebt = row[i] != 0;
      });
      expect(hasSelfDebt).toBe(false);
    });
    it('should preserve net balance for every user', () => {
      const matrix = [
        [0, 100, 0],
        [0, 0, 100],
        [50, 0, 0],
      ];
      const result = expenseService.simplifyDebts(matrix);
      let rowSum = 0;
      let columnSum = 0;
      let resultRowSum = 0;
      let resultColumnSum = 0;
      let same = true;
      for (let i = 0; i < matrix.length; i++) {
        rowSum = 0;
        columnSum = 0;
        resultRowSum = 0;
        resultColumnSum = 0;
        for (let j = 0; j < matrix[i].length; j++) {
          rowSum += matrix[i][j];
          resultRowSum += result[i][j];
        }
        for (let j = 0; j < matrix[i].length; j++) {
          columnSum += matrix[j][i];
          resultColumnSum += result[j][i];
        }
        if (rowSum - columnSum != resultRowSum - resultColumnSum) {
          same = false;
          break;
        }
      }
      expect(same).toBe(true);
    });
    it('should handle empty matrix', () => {
      const matrix = [[]];
      const result = expenseService.simplifyDebts(matrix);
      const expectedMatrix = [[]];
      expect(result).toEqual(expectedMatrix);
    });
    it('should handle matrix with single user', () => {
      const matrix = [[0]];
      const result = expenseService.simplifyDebts(matrix);
      const expectedMatrix = [[0]];
      expect(result).toEqual(expectedMatrix);
    });
    it('should handle multiple independent debt groups', () => {
      const matrix = [
        [0, 100, 0, 0, 0, 0],
        [0, 0, 100, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 50, 0],
        [0, 0, 0, 0, 0, 50],
        [0, 0, 0, 0, 0, 0],
      ];
      const result = expenseService.simplifyDebts(matrix);
      const expectedMatrix = [
        [0, 0, 100, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 50],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      expect(result).toEqual(expectedMatrix);
    });
    it('should return the same expenses when simplify isnt possible', () => {
      const matrix = [
        [0, 100, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 50, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 30],
        [0, 0, 0, 0, 0, 0],
      ];
      const result = expenseService.simplifyDebts(matrix);
      const expectedMatrix = [
        [0, 100, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 50, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 30],
        [0, 0, 0, 0, 0, 0],
      ];
      expect(result).toEqual(expectedMatrix);
    });
  });
});
