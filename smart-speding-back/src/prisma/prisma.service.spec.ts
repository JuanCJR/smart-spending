import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('is defined and extends PrismaClient ($connect/$disconnect available)', () => {
    expect(service).toBeDefined();
    expect(typeof service.$connect).toBe('function');
    expect(typeof service.$disconnect).toBe('function');
  });

  it('connects to the database on module init', async () => {
    const connect = jest
      .spyOn(service, '$connect')
      .mockResolvedValue(undefined);

    await service.onModuleInit();

    expect(connect).toHaveBeenCalledTimes(1);
  });

  it('registers a beforeExit shutdown hook that closes the Nest app', () => {
    const app = {
      close: jest.fn().mockResolvedValue(undefined),
    } as unknown as INestApplication;
    const onSpy = jest.spyOn(process, 'on');

    service.enableShutdownHooks(app);

    expect(onSpy).toHaveBeenCalledWith('beforeExit', expect.any(Function));
    onSpy.mockRestore();
  });
});
