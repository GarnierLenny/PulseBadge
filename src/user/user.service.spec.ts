import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './user.repository';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
      ],
      providers: [UserRepository, PrismaService, UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const user = await service.createUser();

    expect(user).toBeDefined();
    await service.deleteUserById(user.id);
  });

  it('should find user', async () => {
    const user = await service.createUser();
    const foundUser = await service.findUserById(user.id);

    expect(foundUser).toBeDefined();
    await service.deleteUserById(user.id);
  });
});
