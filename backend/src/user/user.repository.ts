import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser() {
    return this.prisma.user.create({
      data: {
        email: 'test@test.com',
        username: 'test',
        display_name: 'test',
      },
    });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteUserById(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
