import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
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
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest
              .fn()
              .mockResolvedValue({ id: '1', email: 'test@test.com' }),
            findUserById: jest
              .fn()
              .mockResolvedValue({ id: '1', email: 'test@test.com' }),
            deleteUserById: jest.fn().mockResolvedValue({ id: '1' }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const user = await service.createUser();

    expect(user).toBeDefined();
  });

  it('should find user', async () => {
    const user = await service.createUser();
    const foundUser = await service.findUserById(user.id);

    expect(foundUser).toBeDefined();
  });
});
