// src/backend/budget/domain/budget.ts

/**
 * Represents the core Budget entity in the domain layer.
 */
export interface Budget {
  id: string;
  userId: string;
  projectDescription: string;
  priority: 'cost' | 'quality' | 'sustainability';
  budget: number;
  desiredMaterials?: string;
  estimatedCost: number;
  suggestedMaterials: string;
  adjustments: string;
  createdAt: Date;
}

/**
 * Represents a repository interface for budget data persistence.
 */
export interface BudgetRepository {
  findById(id: string): Promise<Budget | null>;
  findByUserId(userId: string): Promise<Budget[]>;
  save(budget: Budget): Promise<void>;
}
