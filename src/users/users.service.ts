import { UserDto } from './user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: UserDto) {
    console.log(user);
    const createdUser = this.userRepository.create(user);

    return this.userRepository.save(createdUser);
  }

  async updateUser(id: number, updatedUser: Partial<User>) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updatedUser);
    return this.userRepository.save(user);
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.find({
      where: {
        email,
      },
    });
  }

  async getUserById(userId: number) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async removeUser(id: number) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return this.userRepository.remove(user);
  }
}
