import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: () => [],
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
