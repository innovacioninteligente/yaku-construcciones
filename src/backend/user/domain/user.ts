// src/backend/user/domain/user.ts

/**
 * Represents the core User entity in the domain layer.
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

/**
 * Represents a repository interface for user data persistence.
 * This defines the contract that infrastructure layer must implement.
 */
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
