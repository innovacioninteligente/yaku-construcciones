// src/backend/user/application/user-service.ts
import type { User, UserRepository } from '../domain/user';

/**
 * Application service for user-related operations.
 * It contains the business logic that is independent of any framework.
 */
export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createNewUser(email: string, name?: string): Promise<User> {
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
      createdAt: new Date(),
    };
    await this.userRepository.save(newUser);
    return newUser;
  }
}
