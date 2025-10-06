// src/backend/budget/infrastructure/budget-repository-firestore.ts
import type { Budget, BudgetRepository } from '../domain/budget';
// import { adminDb } from '@/lib/firebase/server';

/**
 * Firestore implementation of the BudgetRepository.
 */
export class BudgetRepositoryFirestore implements BudgetRepository {
  // private budgetCollection = adminDb.collection('budgets');

  async findById(id: string): Promise<Budget | null> {
    console.log(`[Infrastructure] Finding budget by ID from Firestore: ${id}`);
    // const doc = await this.budgetCollection.doc(id).get();
    // if (!doc.exists) return null;
    // return doc.data() as Budget;
    return Promise.resolve(null);
  }

  async findByUserId(userId: string): Promise<Budget[]> {
    console.log(`[Infrastructure] Finding budgets for user from Firestore: ${userId}`);
    // const snapshot = await this.budgetCollection.where('userId', '==', userId).get();
    // return snapshot.docs.map(doc => doc.data() as Budget);
    return Promise.resolve([]);
  }

  async save(budget: Budget): Promise<void> {
    console.log(`[Infrastructure] Saving budget to Firestore: ${budget.id}`);
    // await this.budgetCollection.doc(budget.id).set(budget);
    return Promise.resolve();
  }
}
