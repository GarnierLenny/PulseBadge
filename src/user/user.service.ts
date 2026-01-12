import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser() {
    return this.userRepository.createUser();
  }

  async findUserById(id: string) {
    return this.userRepository.findUserById(id);
  }

  async deleteUserById(id: string) {
    return this.userRepository.deleteUserById(id);
  }
}
